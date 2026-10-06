import dns from 'dns';
try {
  dns.setServers(['8.8.8.8', '1.1.1.1', '8.8.4.4']);
} catch (e) {
  // Ignore if custom dns not supported
}

import mongoose from 'mongoose';
import { UserModel } from '../models/User';
import { BookModel } from '../models/Book';
import { AlmariModel } from '../models/Almari';
import { MemberModel } from '../models/Member';
import { BorrowTransactionModel } from '../models/BorrowTransaction';
import { SeatModel } from '../models/Seat';
import { DigitalResourceModel } from '../models/DigitalResource';
import { AnnouncementModel } from '../models/Announcement';
import { SuggestionModel } from '../models/Suggestion';
import {
  INITIAL_BOOKS,
  INITIAL_ALMARIS,
  INITIAL_MEMBERS,
  INITIAL_TRANSACTIONS,
  INITIAL_DIGITAL_RESOURCES,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_SUGGESTIONS,
  INITIAL_SEATS,
  INITIAL_USERS
} from '../data/seedData';

export const connectDB = async (): Promise<void> => {
  const mongoURI = process.env.MONGO_URI;

  if (!mongoURI) {
    console.error('❌ MONGO_URI is not defined in environment variables.');
    return;
  }

  try {
    console.log('⏳ Connecting to MongoDB Atlas Cluster...');
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 30000,
      connectTimeoutMS: 30000,
      socketTimeoutMS: 45000,
    });
    console.log(`✅ MongoDB Atlas Connected Successfully: ${conn.connection.host}`);
    console.log(`🗄️ Database Name: ${conn.connection.name}`);

    // Auto-seed initial data if collections are empty
    await autoSeedDatabase();
  } catch (error: any) {
    console.error('⚠️ MongoDB Atlas Connection Note:', error.message || error);
    console.log('ℹ️ Tip: If on a local network, ensure MongoDB Atlas IP Whitelist (0.0.0.0/0) is enabled in MongoDB Atlas Network Access tab.');
  }
};

const autoSeedDatabase = async () => {
  try {
    // 1. Seed Users
    const usersCount = await UserModel.countDocuments();
    if (usersCount === 0) {
      console.log('🌱 Seeding initial user accounts to MongoDB...');
      await UserModel.insertMany(INITIAL_USERS.map(({ id, ...rest }) => rest));
    }

    // 2. Seed Books
    const booksCount = await BookModel.countDocuments();
    if (booksCount === 0) {
      console.log('🌱 Seeding college library books catalog to MongoDB...');
      await BookModel.insertMany(INITIAL_BOOKS.map(({ id, ...rest }) => rest));
    }

    // 3. Seed Almaris
    const almarisCount = await AlmariModel.countDocuments();
    if (almarisCount === 0) {
      console.log('🌱 Seeding almaris and shelf racks to MongoDB...');
      await AlmariModel.insertMany(INITIAL_ALMARIS.map(({ id, ...rest }) => rest));
    }

    // 4. Seed Members
    const membersCount = await MemberModel.countDocuments();
    if (membersCount === 0) {
      console.log('🌱 Seeding registered students and faculty members to MongoDB...');
      await MemberModel.insertMany(INITIAL_MEMBERS.map(({ id, ...rest }) => rest));
    }

    // 5. Seed Transactions
    const txCount = await BorrowTransactionModel.countDocuments();
    if (txCount === 0) {
      console.log('🌱 Seeding borrow circulation history to MongoDB...');
      await BorrowTransactionModel.insertMany(INITIAL_TRANSACTIONS.map(({ id, ...rest }) => rest));
    }

    // 6. Seed Seats
    const seatsCount = await SeatModel.countDocuments();
    if (seatsCount === 0) {
      console.log('🌱 Seeding 60 reading hall seats to MongoDB...');
      await SeatModel.insertMany(
        INITIAL_SEATS.map((s) => ({
          seatId: s.id,
          seatNumber: s.seatNumber,
          zone: s.zone,
          status: s.status,
          currentOccupantRollNo: s.currentOccupantRollNo,
          currentOccupantName: s.currentOccupantName,
          bookedUntil: s.bookedUntil
        }))
      );
    }

    // 7. Seed Digital Resources
    const resCount = await DigitalResourceModel.countDocuments();
    if (resCount === 0) {
      console.log('🌱 Seeding digital archive resources to MongoDB...');
      await DigitalResourceModel.insertMany(INITIAL_DIGITAL_RESOURCES.map(({ id, ...rest }) => rest));
    }

    // 8. Seed Announcements
    const annCount = await AnnouncementModel.countDocuments();
    if (annCount === 0) {
      console.log('🌱 Seeding library notices & announcements to MongoDB...');
      await AnnouncementModel.insertMany(INITIAL_ANNOUNCEMENTS.map(({ id, ...rest }) => rest));
    }

    // 9. Seed Suggestions
    const sugCount = await SuggestionModel.countDocuments();
    if (sugCount === 0) {
      console.log('🌱 Seeding book suggestions to MongoDB...');
      await SuggestionModel.insertMany(INITIAL_SUGGESTIONS.map(({ id, ...rest }) => rest));
    }

    console.log('✨ MongoDB Atlas initialization check complete!');
  } catch (err) {
    console.error('⚠️ Auto-seed check error:', err);
  }
};
