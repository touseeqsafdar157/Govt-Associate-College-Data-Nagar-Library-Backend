import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import { connectDB } from '../src/config/db';
import { BookModel } from '../src/models/Book';
import { MemberModel } from '../src/models/Member';
import { AlmariModel } from '../src/models/Almari';
import { SeatModel } from '../src/models/Seat';
import { UserModel } from '../src/models/User';

async function testMongo() {
  console.log('Testing MongoDB Atlas connection...');
  await connectDB();

  console.log('\n--- MongoDB Collection Counts ---');
  const [users, books, almaris, members, seats] = await Promise.all([
    UserModel.countDocuments(),
    BookModel.countDocuments(),
    AlmariModel.countDocuments(),
    MemberModel.countDocuments(),
    SeatModel.countDocuments()
  ]);

  console.log(`👤 Users: ${users}`);
  console.log(`📚 Books: ${books}`);
  console.log(`🗄️ Almaris: ${almaris}`);
  console.log(`🎓 Members: ${members}`);
  console.log(`🪑 Seats: ${seats}`);

  console.log('\n--- Sample Query Test ---');
  const sampleBook = await BookModel.findOne();
  console.log(`Found book in MongoDB: "${sampleBook?.title}" (Accession: ${sampleBook?.accessionNo})`);

  console.log('\n✅ MONGODB ATLAS INTEGRATION TEST PASSED SUCCESSFULLY! 🎉');
  await mongoose.disconnect();
  process.exit(0);
}

testMongo().catch((err) => {
  console.error('MongoDB test failed:', err);
  process.exit(1);
});
