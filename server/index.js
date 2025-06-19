import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/Authroute.js';
import eventRoutes from './routes/Eventroute.js';
import paymentRouter from './utils/PaymentRoute.js';
import connectRouter from './routes/ConnectRoute.js';
import walletRoutes from './routes/WalletRoute.js';

dotenv.config();

const app = express();
const allowedOrigins = [
  'https://event-system-management.vercel.app',
];

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      "script-src": [
        "'self'",
        "https://www.paypal.com",
        "https://www.sandbox.paypal.com",
        "https://www.paypalobjects.com"
      ],
      "connect-src": [
        "'self'",
        "https://www.paypal.com",
        "https://www.sandbox.paypal.com",
        "https://api.sandbox.paypal.com",
        "https://www.sandbox.paypal.com/xoplatform/logger/api/logger" // Add logger endpoint
      ],
      "frame-src": [
        "https://www.paypal.com",
        "https://www.sandbox.paypal.com"
      ]
    }
  }
}));

app.use(cors({
   origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'Cache-Control',
    'Pragma',
    'X-Requested-With'
  ],
  exposedHeaders: ['Set-Cookie']
}));


app.use((req, res, next) => {
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/payment', paymentRouter);
app.use('/api/connect', connectRouter);
app.use('/api', walletRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use((err, req, res, next) => {
  if (err instanceof mongoose.Error.CastError) {
    return res.status(400).json({ msg: "Invalid ID format" });
  }
  console.error("Global Error:", err);
  res.status(500).json({ msg: "Server error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));