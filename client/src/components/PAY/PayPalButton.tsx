import { PayPalButtons } from '@paypal/react-paypal-js';

export const PayPalButton = ({ 
  amount,
  onSuccess,
  onError
}: {
  amount: number;
  onSuccess: (details: any) => Promise<void>;
  onError: (err: any) => void;
}) => {
  return (
    <PayPalButtons
      style={{ layout: 'vertical' }}
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
        } catch (err) {
          onError(err);
        }
      }}
      onError={onError}
    />
  );
};