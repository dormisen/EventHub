import { PayPalButtons } from '@paypal/react-paypal-js';
<<<<<<< HEAD
import API from '../../api/axios';

export const PayPalButton = ({ 
  eventId,
  tickets,
  onSuccess,
  onError
}: {
  eventId: string;
  tickets: Array<{ id: string; quantity: number }>;
=======

export const PayPalButton = ({ 
  amount,
  onSuccess,
  onError
}: {
  amount: number;
>>>>>>> a175ee5a7844f8e8b8b1a23e88f06aa8c8538a20
  onSuccess: (details: any) => Promise<void>;
  onError: (err: any) => void;
}) => {
  return (
    <PayPalButtons
      style={{ layout: 'vertical' }}
<<<<<<< HEAD
      createOrder={async () => {
        try {
          const { data } = await API.post('/payment/create-paypal-order', {
            eventId,
            tickets
          });
          return data.orderId as string;
        } catch (err) {
          onError(err);
          throw err;
        }
      }}
      onApprove={async (data) => {
        try {
          const result = await API.post('/payment/capture-paypal-order', {
            orderId: (data as any).orderID,
          });
          await onSuccess(result.data);
=======
      createOrder={(_data, actions) => {
        return actions.order.create({
          intent: 'CAPTURE',
          purchase_units: [{
            amount: {
              value: amount.toString(),
              currency_code: 'USD'
            }
          }]
        });
      }}
      onApprove={async (_, actions) => {
        try {
          const details = await actions.order?.capture();
          if (details) await onSuccess(details);
>>>>>>> a175ee5a7844f8e8b8b1a23e88f06aa8c8538a20
        } catch (err) {
          onError(err);
        }
      }}
      onError={onError}
    />
  );
};