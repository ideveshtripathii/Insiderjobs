// -------------------- LOAD ENV FIRST --------------------
import './config/env.js';

// -------------------- IMPORTS --------------------
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import { clerkWebhooks } from './controllers/webhooks.js';
import companyRoutes from './routes/companyRoutes.js';
import connectCloudinary from './config/cloudinary.js';
import jobRoutes from './routes/jobRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { clerkMiddleware } from '@clerk/express';

// -------------------- INITIALIZE EXPRESS --------------------
const app = express();

// -------------------- LOGGING START --------------------
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// -------------------- MIDDLEWARES --------------------
app.use(cors());

app.post('/webhooks', express.raw({ type: 'application/json' }), clerkWebhooks);
app.use(express.json());
app.use(clerkMiddleware({
  secretKey: process.env.CLERK_SECRET_KEY,
  publishableKey: process.env.CLERK_PUBLISHABLE_KEY
}));

// -------------------- ROUTES --------------------
app.get('/', (req, res) => res.send("API Working"));
app.get('/test-auth', (req, res) => {
  res.json({ auth: req.auth });
});

app.get('/api/test-db', async (req, res) => {
  try {
    const mongoose = await import('mongoose');
    const state = mongoose.connection.readyState;
    const states = ["disconnected", "connected", "connecting", "disconnecting"];
    res.json({
      success: true,
      status: states[state],
      database: mongoose.connection.name
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.get('/api/debug-cloudinary', async (req, res) => {
  try {
    const { v2: cloudinary } = await import('cloudinary');
    const result = await cloudinary.uploader.upload("https://res.cloudinary.com/demo/image/upload/sample.jpg");
    res.json({ success: true, url: result.secure_url });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.get('/api/system-diag', async (req, res) => {
  try {
    const userId = req.auth?.userId;
    const { default: JobApplication } = await import('./models/JobApplication.js');
    const { default: User } = await import('./models/User.js');

    const allApps = await JobApplication.find({});
    const currentUser = userId ? await User.findById(userId) : null;
    const userApps = userId ? await JobApplication.find({ userId }) : [];

    res.json({
      success: true,
      auth: req.auth,
      currentUser,
      userAppsCount: userApps.length,
      allAppsCount: allApps.length,
      sampleApps: allApps.slice(0, 5)
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.use('/api/company', companyRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/users', userRoutes);

// Custom Error Handler
app.use((err, req, res, next) => {
  console.error("GLOBAL ERROR:", err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
});

// -------------------- START SERVER --------------------
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    await connectCloudinary();

    if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
      app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
      });
    }

  } catch (error) {
    console.error("❌ Server initialization failed:", error.message);
  }
};

startServer();

export default app;
