import paypal from '@paypal/checkout-server-sdk';
import Event from '../models/Event.js';
import User from '../models/User.js';
import Transaction from '../models/Transaction.js';
import Wallet from '../models/Wallet.js';
import crypto from 'crypto';

function payPalClient() {
  return new paypal.core.PayPalHttpClient(
    process.env.NODE_ENV === 'production'
      ? new paypal.core.LiveEnvironment(
        process.env.PAYPAL_CLIENT_ID,
        process.env.PAYPAL_CLIENT_SECRET
      )
      : new paypal.core.SandboxEnvironment(
        process.env.PAYPAL_CLIENT_ID,
        process.env.PAYPAL_CLIENT_SECRET
      )
  );
}

class PaymentService {
  static async createPayPalOrder(userId, eventId, tickets) {
    try {
      const event = await Event.findById(eventId).populate('organizer');

      if (!event) {
        throw new Error('Event not found');
      }

      if (!event?.organizer?.organizerInfo?.paypalMerchantId) {
        throw new Error('Organizer has not set up PayPal account');
      }

      if (event.organizer.organizerInfo.paypalAccountStatus !== 'verified') {
        throw new Error('Organizer PayPal account not verified');
      }

      const totalAmount = tickets.reduce((total, { id, quantity }) => {
        const ticket = event.tickets.find(t => t._id.toString() === id);
        if (!ticket) {
          throw new Error(`Ticket ${id} not found`);
        }
        return total + (ticket.price * quantity);
      }, 0);

      if (totalAmount <= 0) {
        throw new Error('Invalid order amount');
      }

      const request = new paypal.orders.OrdersCreateRequest();
      request.prefer("return=representation");
      request.requestBody({
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: 'USD',
            value: totalAmount.toFixed(2),
            breakdown: {
              item_total: {
                currency_code: 'USD',
                value: totalAmount.toFixed(2)
              }
            }
          },
          payee: {
            merchant_id: event.organizer.organizerInfo.paypalMerchantId
          },
          items: tickets.map(({ id, quantity }) => {
            const ticket = event.tickets.find(t => t._id.toString() === id);
            return {
              name: `${event.title} - ${ticket.name}`,
              quantity: quantity.toString(),
              unit_amount: {
                currency_code: 'USD',
                value: ticket.price.toFixed(2)
              }
            };
          })
        }],
        application_context: {
          return_url: `${process.env.FRONTEND_URL}/payment-success`,
          cancel_url: `${process.env.FRONTEND_URL}/payment-cancelled`,
          brand_name: event.organizer.organizerInfo.organizationName || 'Event Platform'
        }
      });

      const client = payPalClient();
      const response = await client.execute(request);

      // Create transaction record
      const transaction = await Transaction.create({
        user: userId,
        event: eventId,
        organizer: event.organizer._id,
        amount: totalAmount,
        type: 'payment',
        status: 'pending',
        paypalOrderId: response.result.id,
        tickets: tickets.map(({ id, quantity }) => ({
          ticket: id,
          quantity
        }))
      });

      return {
        orderId: response.result.id,
        approvalUrl: response.result.links.find(link => link.rel === 'approve').href
      };
    } catch (error) {
      console.error('Failed to create PayPal order:', error);
      throw new Error(`Failed to create order: ${error.message}`);
    }
  }

  static async capturePayPalOrder(orderId) {
    try {
      const request = new paypal.orders.OrdersCaptureRequest(orderId);
      const client = payPalClient();
      const response = await client.execute(request);

      // Update transaction status
      const transaction = await Transaction.findOneAndUpdate(
        { paypalOrderId: orderId },
        { status: 'completed' },
        { new: true }
      );

      if (transaction) {
        const event = await Event.findById(transaction.event).populate('organizer');
        
        // Update wallet balance
        await Wallet.findOneAndUpdate(
          { user: event.organizer._id },
          { $inc: { balance: transaction.amount } },
          { new: true, upsert: true }
        );

        // Update event attendees
        await Event.findByIdAndUpdate(
          event._id,
          {
            $push: {
              attendees: {
                user: transaction.user,
                tickets: transaction.tickets,
                pricePaid: transaction.amount,
                transaction: transaction._id
              }
            }
          }
        );
      }

      return response.result;
    } catch (error) {
      console.error('Failed to capture PayPal order:', error);
      throw new Error(`Failed to capture order: ${error.message}`);
    }
  }

  static async createPayPalPayout(organizerId, amount) {
    try {
      if (amount <= 0) {
        throw new Error('Payout amount must be greater than 0');
      }

      const user = await User.findById(organizerId);
      if (!user?.organizerInfo?.paypalEmail) {
        throw new Error('Organizer PayPal email not configured');
      }

      const wallet = await Wallet.findOne({ user: organizerId });
      if (!wallet || wallet.balance < amount) {
        throw new Error('Insufficient funds for payout');
      }

      const request = new paypal.payouts.PayoutsPostRequest();
      request.requestBody({
        sender_batch_header: {
          sender_batch_id: crypto.randomBytes(8).toString('hex'),
          email_subject: "Event Payout",
          email_message: `Your payout of $${amount.toFixed(2)} from Event Platform`
        },
        items: [{
          recipient_type: "EMAIL",
          amount: {
            value: amount.toFixed(2),
            currency: "USD"
          },
          receiver: user.organizerInfo.paypalEmail,
          note: "Event earnings payout",
          sender_item_id: "PAYOUT-" + Date.now()
        }]
      });

      const client = payPalClient();
      const response = await client.execute(request);

      // Save payout record
      await Wallet.findOneAndUpdate(
        { user: organizerId },
        {
          $push: {
            payouts: {
              payoutId: response.result.batch_header.payout_batch_id,
              amount: amount,
              status: 'pending',
              createdAt: new Date()
            }
          },
          $inc: { balance: -amount, pendingBalance: amount }
        }
      );

      return response.result;
    } catch (error) {
      console.error('Failed to create PayPal payout:', error);
      throw new Error(`Failed to create payout: ${error.message}`);
    }
  }

  static async getPayoutStatus(payoutId) {
    try {
      const request = new paypal.payouts.PayoutsGetRequest(payoutId);
      const client = payPalClient();
      const response = await client.execute(request);
      return response.result;
    } catch (error) {
      console.error('Failed to get payout status:', error);
      throw new Error(`Failed to get payout status: ${error.message}`);
    }
  }
}

export default PaymentService;