import express from 'express';
import PaymentService from '../services/paymentService.js';
import authMiddleware from '../Midleware/Authmidleware.js';

const router = express.Router();

router.post('/create-paypal-order', authMiddleware, async (req, res) => {
  try {
    const { orderId, approvalUrl } = await PaymentService.createPayPalOrder(
      req.user.id,
      req.body.eventId,
      req.body.tickets
    );
    res.json({ orderId, approvalUrl });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/capture-paypal-order', authMiddleware, async (req, res) => {
  try {
    const result = await PaymentService.capturePayPalOrder(req.body.orderId);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.post('/create-payout', authMiddleware, async (req, res) => {
  try {
    const result = await PaymentService.createPayPalPayout(req.user.id, req.body.amount);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;