import { Schema, model, Document } from 'mongoose';

export interface IMember extends Document {
  id?: string;
  rollNo: string;
  name: string;
  fatherName?: string;
  role: 'student' | 'teacher';
  email: string;
  phone: string;
  classGrade: string;
  section: string;
  shift: 'Morning' | 'Evening';
  department: string;
  status: 'Active' | 'Blocked' | 'Graduated';
  issuedBooksCount: number;
  maxAllowedBooks: number;
  joinedDate: string;
  libraryCardNo: string;
}

const MemberSchema = new Schema<IMember>(
  {
    rollNo: { type: String, required: true, unique: true, uppercase: true, trim: true },
    name: { type: String, required: true, trim: true },
    fatherName: { type: String, default: '' },
    role: { type: String, enum: ['student', 'teacher'], default: 'student' },
    email: { type: String, default: '' },
    phone: { type: String, default: '0300-0000000' },
    classGrade: { type: String, default: '1st Year (General)' },
    section: { type: String, default: 'Section A' },
    shift: { type: String, enum: ['Morning', 'Evening'], default: 'Morning' },
    department: { type: String, default: 'General' },
    status: { type: String, enum: ['Active', 'Blocked', 'Graduated'], default: 'Active' },
    issuedBooksCount: { type: Number, default: 0, min: 0 },
    maxAllowedBooks: { type: Number, default: 2 },
    joinedDate: { type: String, default: () => new Date().toISOString().split('T')[0] },
    libraryCardNo: { type: String, default: () => `LIB-DN-${Math.floor(1000 + Math.random() * 9000)}` }
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

export const MemberModel = model<IMember>('Member', MemberSchema);
