import express from 'express';
import authMiddleware from '../Midleware/Authmidleware.js';
import Wallet from '../models/Wallet.js';
import Transaction from '../models/Transaction.js';

const router = express.Router();

  
// Get wallet balance
router.get('/wallet', authMiddleware, async (req, res) => {
  try {
    const wallet = await Wallet.findOne({ user: req.user.id });
    res.json({ balance: wallet?.balance || 0 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get transactions
router.get('/transactions', authMiddleware, async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .limit(50);
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.post('/request-payout', authMiddleware, async (req, res) => {
  try {
    const { amount } = req.body;
    const wallet = await Wallet.findOne({ user: req.user.id });
    
    if (wallet.balance < amount) {
      return res.status(400).json({ error: "Insufficient balance" });
    }

    // Create PayPal payout
    const payout = await PaymentService.createPayPalPayout(req.user.id, amount);
    
    // Update wallet
    wallet.balance -= amount;
    wallet.pendingBalance += amount;
    wallet.pendingPayouts.push({
      amount,
      payoutId: payout.payout_batch_id,
      status: 'pending'
    });
    
    await wallet.save();
    res.json(payout);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;