import { useState } from 'react';
import API from '../api/axios';
import { FaPaypal } from 'react-icons/fa';

const PayPalOnboardingButton = ({ 
  status, 
  onStatusChange,
  onError 
}: { 
  status: string, 
  onStatusChange: (status: string) => void,
  onError: (error: string) => void 
}) => {
  const [loading, setLoading] = useState(false);

  const startOnboarding = async () => {
    setLoading(true);
    try {
      const { data } = await API.get('/connect/onboard-organizer');
      
      // Directly redirect to PayPal's approval URL
      window.location.assign(data.approvalUrl);
    } catch (err: any) {
      console.error('PayPal onboarding failed:', err);
      const errorMsg = err.response?.data?.message || 'Failed to start PayPal onboarding';
      onError(errorMsg);
      onStatusChange('not_connected');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={startOnboarding}
      disabled={loading || status === 'pending'}
      className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
    >
      <FaPaypal className="w-5 h-5" />
      {loading ? 'Loading...' : (status === 'pending' ? 'Verification in Progress' : 'Connect PayPal Account')}
    </button>
  );
};

export default PayPalOnboardingButton;