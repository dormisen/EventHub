import express from 'express';
import User from '../models/User.js';
import authMiddleware from '../Midleware/Authmidleware.js';
import axios from 'axios';
import 'dotenv/config';

const router = express.Router();

// PayPal Access Token Generator
async function generatePayPalAccessToken() {
  const apiUrl = `${process.env.PAYPAL_API_BASE}/v1/oauth2/token`;
  
  const auth = Buffer.from(
    `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
  ).toString('base64');

  try {
    const data = new URLSearchParams();
    data.append('grant_type', 'client_credentials');
    
    const response = await axios.post(
      apiUrl,
      data,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${auth}`
        }
      }
    );
    return response.data.access_token;
  } catch (error) {
    console.error('Failed to generate PayPal access token:', {
      message: error.message,
      responseData: error.response?.data,
      stack: error.stack
    });
    throw new Error('PayPal authentication failed');
  }
}

// Organizer Verification Middleware
const verifyOrganizer = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user || user.role !== 'organizer' || !user.organizerInfo?.verified) {
      return res.status(403).json({
        error: 'Access denied. Verified organizer account required.',
        code: 'ORGANIZER_VERIFICATION_REQUIRED'
      });
    }

    req.organizer = user;
    next();
  } catch (error) {
    console.error('Organizer verification error:', error);
    res.status(500).json({ error: 'Server error during verification' });
  }
};

router.get('/onboard-organizer', authMiddleware, verifyOrganizer, async (req, res) => {
  try {
    const accessToken = await generatePayPalAccessToken();
    
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
      'PayPal-Partner-Attribution-Id': process.env.PAYPAL_ATTRIBUTION_ID || 'APP-80W284485P519543T',
      'PayPal-Request-Id': `req_${Date.now()}`
    };

    // Create partner referral with required URLs
    const response = await axios.post(
      `${process.env.PAYPAL_API_BASE}/v2/customer/partner-referrals`,
      {
        tracking_id: req.user.id,
        operations: [
          {
            operation: "API_INTEGRATION",
            api_integration_preference: {
              rest_api_integration: {
                integration_method: "PAYPAL",
                integration_type: "THIRD_PARTY",
                third_party_details: {
                  features: ["PAYMENT", "REFUND"]
                }
              }
            }
          }
        ],
        products: ["PPCP"],
        legal_consents: [
          {
            type: "SHARE_DATA_CONSENT",
            granted: true
          }
        ],
        // Add required URLs
        partner_config_override: {
          return_url: `${process.env.CLIENT_URL}/paypal-return`,
          return_url_description: 'Return to Event Platform',
          cancel_url: `${process.env.CLIENT_URL}/paypal-return`
        }
      },
      { headers }
    );

    // Save merchant ID and set status to pending
    await User.findByIdAndUpdate(req.user.id, {
      'organizerInfo.paypalMerchantId': response.data.partner_referral_id,
      'organizerInfo.paypalAccountStatus': 'pending'
    });

    // Find the approval URL
    const actionLink = response.data.links.find(link => 
      link.rel === 'action_url' && link.method === 'GET'
    );
    
    if (!actionLink) {
      throw new Error('No approval URL found in PayPal response');
    }

    res.json({ approvalUrl: actionLink.href });
  } catch (error) {
    console.error('PayPal account creation failed:', {
      message: error.message,
      response: error.response?.data,
      stack: error.stack
    });
    
    const errorDetails = {
      message: 'Failed to create PayPal account',
      debugId: error.response?.data?.debug_id,
      statusCode: error.response?.status,
      details: error.response?.data
    };
    
    res.status(500).json(errorDetails);
  }
});

// PayPal Status Check
router.get('/check-paypal-status', authMiddleware, verifyOrganizer, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const { paypalMerchantId, paypalAccountStatus } = user.organizerInfo;

    // Only check PayPal API if merchant ID exists and status isn't verified
    if (paypalMerchantId && paypalAccountStatus !== 'verified') {
      try {
        const accessToken = await generatePayPalAccessToken();
        const response = await axios.get(
          `${process.env.PAYPAL_API_BASE}/v1/customer/partners/${process.env.PAYPAL_CLIENT_ID}/merchant-integrations/${paypalMerchantId}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`,
              'PayPal-Partner-Attribution-Id': process.env.PAYPAL_ATTRIBUTION_ID || 'APP-80W284485P519543T'
            }
          }
        );

        // Update status based on PayPal response
        const paypalStatus = response.data.merchant_integration.status;
        let newStatus = paypalAccountStatus;
        
        if (paypalStatus === 'ACTIVE') {
          newStatus = 'verified';
        } else if (paypalStatus === 'DENIED' || paypalStatus === 'DEACTIVATED') {
          newStatus = 'denied';
        } else if (paypalStatus === 'PENDING') {
          newStatus = 'pending';
        }

        // Update database if status changed
        if (newStatus !== paypalAccountStatus) {
          await User.findByIdAndUpdate(req.user.id, {
            'organizerInfo.paypalAccountStatus': newStatus
          });
        }

        return res.json({
          paypalMerchantId,
          paypalAccountStatus: newStatus
        });
      } catch (error) {
        console.error('PayPal status check failed:', error.response?.data || error.message);
        // Fallback to stored status
      }
    }

    res.json({
      paypalMerchantId,
      paypalAccountStatus: paypalAccountStatus || 'not_connected'
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to check PayPal status',
      details: error.message 
    });
  }
});

// Merchant Status Check
router.get('/check-merchant-status/:merchantId', authMiddleware, verifyOrganizer, async (req, res) => {
  try {
    const accessToken = await generatePayPalAccessToken();
    const response = await axios.get(
      `${process.env.PAYPAL_API_BASE}/v1/customer/partners/${process.env.PAYPAL_CLIENT_ID}/merchant-integrations/${req.params.merchantId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
          'PayPal-Partner-Attribution-Id': process.env.PAYPAL_ATTRIBUTION_ID || 'APP-80W284485P519543T'
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error('Merchant status check failed:', error.response?.data || error.message);
    res.status(500).json({ 
      error: 'Failed to check merchant status',
      details: error.response?.data 
    });
  }
});

// Test endpoint
router.get('/test-paypal-auth', async (req, res) => {
  try {
    const token = await generatePayPalAccessToken();
    res.json({ success: true, token });
  } catch (error) {
    console.error('Auth test failed:', error.response?.data || error.message);
    res.status(500).json({ 
      error: 'Auth failed',
      details: error.response?.data || error.message 
    });
  }
});

// Update save-merchant endpoint
router.post('/save-merchant', authMiddleware, verifyOrganizer, async (req, res) => {
  try {
    const { merchantId } = req.body;
    
    // Validate merchant ID
    if (!merchantId || typeof merchantId !== 'string') {
      return res.status(400).json({ error: 'Invalid merchant ID' });
    }

    await User.findByIdAndUpdate(req.user.id, {
      'organizerInfo.paypalMerchantId': merchantId,
      'organizerInfo.paypalAccountStatus': 'pending'
    });

    res.json({ success: true });
  } catch (error) {
    console.error('Failed to save merchant ID:', error);
    res.status(500).json({ 
      error: 'Failed to save PayPal merchant ID',
      details: error.message 
    });
  }
});

export default router;