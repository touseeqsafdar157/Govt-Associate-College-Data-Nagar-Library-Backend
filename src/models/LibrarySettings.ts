import { Schema, model, Document } from 'mongoose';

export interface IStaffMember {
  id?: string;
  name: string;
  designation: string;
  shift: string;
  desk: string;
  phone?: string;
  email?: string;
}

export interface ILibraryRule {
  title: string;
  desc: string;
}

export interface IFAQ {
  question: string;
  answer: string;
}

export interface ILibrarySettings extends Document {
  id?: string;
  finePerDay: number;
  maxBorrowDaysStudent: number;
  maxBorrowDaysTeacher: number;
  maxBooksStudent: number;
  maxBooksTeacher: number;
  timings: string;
  location: string;
  collegeName: string;
  contactPhone: string;
  contactEmail: string;
  staffMembers: IStaffMember[];
  libraryRules: ILibraryRule[];
  faqs: IFAQ[];
}

const LibrarySettingsSchema = new Schema<ILibrarySettings>(
  {
    finePerDay: { type: Number, default: 5 },
    maxBorrowDaysStudent: { type: Number, default: 14 },
    maxBorrowDaysTeacher: { type: Number, default: 30 },
    maxBooksStudent: { type: Number, default: 2 },
    maxBooksTeacher: { type: Number, default: 5 },
    timings: { type: String, default: 'Mon–Sat: 8:00 AM – 4:00 PM' },
    location: { type: String, default: 'Data Nagar, Badami Bagh, Lahore' },
    collegeName: { type: String, default: 'Govt Associate College Data Nagar Lahore' },
    contactPhone: { type: String, default: '042-99001122' },
    contactEmail: { type: String, default: 'library@gacdn.edu.pk' },
    staffMembers: [
      {
        name: { type: String, required: true },
        designation: { type: String, required: true },
        shift: { type: String, required: true },
        desk: { type: String, required: true },
        phone: { type: String },
        email: { type: String }
      }
    ],
    libraryRules: [
      {
        title: { type: String, required: true },
        desc: { type: String, required: true }
      }
    ],
    faqs: [
      {
        question: { type: String, required: true },
        answer: { type: String, required: true }
      }
    ]
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

export const LibrarySettingsModel = model<ILibrarySettings>('LibrarySettings', LibrarySettingsSchema);
