import { Schema, model, Document } from 'mongoose';

export interface IBorrowTransaction extends Document {
  id?: string;
  transactionNo: string;
  bookId: string;
  bookTitle: string;
  bookAccessionNo: string;
  almariLocation: string;
  memberId: string;
  memberRollNo: string;
  memberName: string;
  memberClass: string;
  memberSection: string;
  memberRole: 'student' | 'teacher';
  issueDate: string;
  dueDate: string;
  returnDate?: string;
  status: 'Active' | 'Returned' | 'Overdue';
  fineAmount: number;
  fineStatus: 'None' | 'Pending' | 'Paid' | 'Waived';
  issuedByStaff: string;
  renewCount: number;
}

const BorrowTransactionSchema = new Schema<IBorrowTransaction>(
  {
    transactionNo: { type: String, required: true, unique: true },
    bookId: { type: String, required: true },
    bookTitle: { type: String, required: true },
    bookAccessionNo: { type: String, required: true },
    almariLocation: { type: String, default: '' },
    memberId: { type: String, required: true },
    memberRollNo: { type: String, required: true },
    memberName: { type: String, required: true },
    memberClass: { type: String, default: '' },
    memberSection: { type: String, default: '' },
    memberRole: { type: String, enum: ['student', 'teacher'], default: 'student' },
    issueDate: { type: String, required: true },
    dueDate: { type: String, required: true },
    returnDate: { type: String },
    status: { type: String, enum: ['Active', 'Returned', 'Overdue'], default: 'Active' },
    fineAmount: { type: Number, default: 0 },
    fineStatus: { type: String, enum: ['None', 'Pending', 'Paid', 'Waived'], default: 'None' },
    issuedByStaff: { type: String, default: 'Chief Librarian' },
    renewCount: { type: Number, default: 0 }
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = (ret as any)._id?.toString();
        delete (ret as any)._id;
        delete (ret as any).__v;
      }
    }
  }
);

export const BorrowTransactionModel = model<IBorrowTransaction>('BorrowTransaction', BorrowTransactionSchema);
