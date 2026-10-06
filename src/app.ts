import express from 'express';
import cors from 'cors';
import { errorHandler } from './middleware/error.middleware';

// Routes
import authRoutes from './routes/auth.routes';
import booksRoutes from './routes/books.routes';
import almarisRoutes from './routes/almaris.routes';
import membersRoutes from './routes/members.routes';
import transactionsRoutes from './routes/transactions.routes';
import seatsRoutes from './routes/seats.routes';
import resourcesRoutes from './routes/resources.routes';
import announcementsRoutes from './routes/announcements.routes';
import suggestionsRoutes from './routes/suggestions.routes';
import feedbackRoutes from './routes/feedback.routes';
import dashboardRoutes from './routes/dashboard.routes';

const app = express();

// Middlewares
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    service: 'Govt Associate College Data Nagar Lahore Library API',
    version: '1.0.0'
  });
});

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/books', booksRoutes);
app.use('/api/almaris', almarisRoutes);
app.use('/api/members', membersRoutes);
app.use('/api/transactions', transactionsRoutes);
app.use('/api/seats', seatsRoutes);
app.use('/api/resources', resourcesRoutes);
app.use('/api/announcements', announcementsRoutes);
app.use('/api/suggestions', suggestionsRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Error handling middleware
app.use(errorHandler);

export default app;
