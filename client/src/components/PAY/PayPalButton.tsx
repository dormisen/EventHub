import { PayPalButtons } from '@paypal/react-paypal-js';
import API from '../../api/axios';

export const PayPalButton = ({ 
  eventId,
  tickets,
  onSuccess,
  onError
}: {
  eventId: string;
  tickets: Array<{ id: string; quantity: number }>;
  onSuccess: (details: any) => Promise<void>;
  onError: (err: any) => void;
}) => {
  return (
    <PayPalButtons
      style={{ layout: 'vertical' }}
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
        } catch (err) {
          onError(err);
        }
      }}
      onError={onError}
    />
  );
};