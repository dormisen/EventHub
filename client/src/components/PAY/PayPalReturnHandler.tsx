import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import API from '../../api/axios';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../context/Authcontext';

const PayPalReturnHandler = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const { user } = useAuth();
  
  useEffect(() => {
    const saveMerchantId = async () => {
      const merchantId = searchParams.get('merchantIdInPP');
      const permissionsGranted = searchParams.get('permissionsGranted');
      
      if (merchantId && permissionsGranted === 'true') {
        try {
          // Send merchant ID to server
          await API.post('/connect/save-merchant', { merchantId }, {
            headers: {
              Authorization: `Bearer ${user?.accessToken}`
            }
          });
          
          toast.success('PayPal account connected successfully!');
          navigate('/organizer/dashboard?paypal=success');
        } catch (err) {
          toast.error('Failed to save PayPal connection');
          navigate('/organizer/dashboard?paypal=error');
        }
      } else {
        toast.error('PayPal onboarding was cancelled');
        navigate('/organizer/dashboard?paypal=cancel');
      }
    };

    saveMerchantId();
  }, [location, navigate, user]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-6"></div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Processing PayPal Connection</h2>
        <p className="text-gray-600">Please wait while we connect your PayPal account...</p>
      </div>
    </div>
  );
};

export default PayPalReturnHandler;