import express from 'express';
import paypal from '@paypal/checkout-server-sdk';
import User from '../models/User.js';
import Wallet from '../models/Wallet.js';
import Transaction from '../models/Transaction.js';
import Event from '../models/Event.js';

const router = express.Router();

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

router.post('/paypal-webhook', async (req, res) => {
  const event = req.body;

  // Verify webhook signature
  const verifyRequest = new paypal.notifications.WebhooksVerifySignatureRequest();
  verifyRequest.requestBody({
    auth_algo: req.headers['paypal-auth-algo'],
    cert_url: req.headers['paypal-cert-url'],
    transmission_id: req.headers['paypal-transmission-id'],
    transmission_sig: req.headers['paypal-transmission-sig'],
    transmission_time: req.headers['paypal-transmission-time'],
    webhook_id: process.env.PAYPAL_WEBHOOK_ID,
    webhook_event: event
  });

  try {
    const client = payPalClient();
    const verification = await client.execute(verifyRequest);
    
    if (verification.result.verification_status !== 'SUCCESS') {
      console.error('Webhook signature verification failed');
      return res.status(401).send();
    }

    // Handle events
    switch (event.event_type) {
      case 'PAYMENT.PAYOUTS-ITEM.SUCCEEDED':
        await handlePayoutSuccess(event);
        break;
      case 'PAYMENT.PAYOUTS-ITEM.FAILED':
        await handlePayoutFailed(event);
        break;
      case 'MERCHANT.ONBOARDING.COMPLETED':
      case 'MERCHANT.PARTNER.CONSENT.REVOKED':
      case 'MERCHANT.ONBOARDING.DECLINED':
      case 'MERCHANT.ONBOARDING.PENDING':
        await handleMerchantOnboarding(event);
        break;
      case 'PAYMENT.CAPTURE.COMPLETED':
        await handlePaymentCapture(event);
        break;
      case 'PAYMENT.CAPTURE.REFUNDED':
        await handlePaymentRefund(event);
        break;
      default:
        console.log(`Unhandled event type: ${event.event_type}`);
    }

    res.status(200).send();
  } catch (error) {
    console.error('Webhook processing error:', error);
    res.status(400).send();
  }
});

async function handlePayoutSuccess(event) {
  const payoutId = event.resource.payout_batch_id;
  const wallet = await Wallet.findOneAndUpdate(
    { "payouts.payoutId": payoutId },
    {
      $set: { "payouts.$.status": "completed" },
      $inc: { pendingBalance: -event.resource.amount.value }
    },
    { new: true }
  );
  
  if (wallet) {
    console.log(`Payout ${payoutId} marked as completed`);
  }
}

async function handlePayoutFailed(event) {
  const payoutId = event.resource.payout_batch_id;
  const wallet = await Wallet.findOneAndUpdate(
    { "payouts.payoutId": payoutId },
    {
      $inc: {
        balance: event.resource.amount.value,
        pendingBalance: -event.resource.amount.value
      },
      $set: { "payouts.$.status": "failed" }
    },
    { new: true }
  );
  
  if (wallet) {
    console.log(`Payout ${payoutId} failed, funds returned to balance`);
  }
}

async function handlePaymentCapture(event) {
  const orderId = event.resource.id;
  const transaction = await Transaction.findOneAndUpdate(
    { paypalOrderId: orderId },
    { status: 'completed' },
    { new: true }
  );
  
  if (transaction) {
    const event = await Event.findById(transaction.event).populate('organizer');
    await Wallet.findOneAndUpdate(
      { user: event.organizer._id },
      { $inc: { balance: transaction.amount } },
      { new: true, upsert: true }
    );
    console.log(`Payment captured for order ${orderId}`);
  }
}

async function handlePaymentRefund(event) {
  const orderId = event.resource.id;
  await Transaction.findOneAndUpdate(
    { paypalOrderId: orderId },
    { status: 'refunded' }
  );
  console.log(`Payment refunded for order ${orderId}`);
}

async function handleMerchantOnboarding(event) {
  try {
    console.log('Processing merchant onboarding:', event.event_type);

    const statusMap = {
      'MERCHANT.ONBOARDING.COMPLETED': 'verified',
      'MERCHANT.PARTNER.CONSENT.REVOKED': 'revoked',
      'MERCHANT.ONBOARDING.DECLINED': 'declined',
      'MERCHANT.ONBOARDING.PENDING': 'pending'
    };

    const updateData = {
      'organizerInfo.paypalAccountStatus': statusMap[event.event_type] || 'pending',
      'organizerInfo.paypalOnboardingCompletedAt': new Date()
    };

    if (event.resource.merchant_email) {
      updateData['organizerInfo.paypalEmail'] = event.resource.merchant_email;
    }

    if (event.resource.permissions_granted) {
      updateData['organizerInfo.paypalPermissions'] = event.resource.permissions_granted;
    }

    if (event.event_type === 'MERCHANT.ONBOARDING.DECLINED') {
      updateData['organizerInfo.paypalDeclineReason'] = event.resource.decline_reason;
    }

    // First try to update by merchant ID
    let updateResult = await User.findOneAndUpdate(
      { 'organizerInfo.paypalMerchantId': event.resource.partner_referral_id },
      updateData,
      { new: true }
    );

    // Fallback to email lookup if merchant ID not found
    if (!updateResult && event.resource.merchant_email) {
      updateResult = await User.findOneAndUpdate(
        { email: event.resource.merchant_email },
        updateData,
        { new: true }
      );
    }

    if (!updateResult) {
      console.error('No user found for merchant onboarding event:', {
        partner_referral_id: event.resource.partner_referral_id,
        merchant_email: event.resource.merchant_email
      });
    } else {
      console.log(`Updated user ${updateResult._id} with PayPal status ${updateData['organizerInfo.paypalAccountStatus']}`);
    }
  } catch (error) {
    console.error('Failed to handle merchant onboarding:', error);
  }
}

export default router;