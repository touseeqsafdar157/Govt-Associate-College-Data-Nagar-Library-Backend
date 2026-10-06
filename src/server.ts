import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import { connectDB } from './config/db';

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Connect to MongoDB Atlas
    await connectDB();

    app.listen(PORT, () => {
      console.log(`====================================================`);
      console.log(`🚀 College Library Backend Server running on port ${PORT}`);
      console.log(`📚 API Base URL: http://localhost:${PORT}/api`);
      console.log(`🏥 Health Check: http://localhost:${PORT}/api/health`);
      console.log(`====================================================`);
    });
  } catch (error) {
    console.error('Failed to start backend server:', error);
    process.exit(1);
  }
};

startServer();
