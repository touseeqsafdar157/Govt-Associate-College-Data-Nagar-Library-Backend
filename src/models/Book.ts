import { Schema, model, Document } from 'mongoose';

export interface IBook extends Document {
  id?: string;
  accessionNo: string;
  title: string;
  author: string;
  isbn: string;
  category: string;
  department: string;
  almariNo: string;
  shelfNo: string;
  publisher: string;
  edition: string;
  year: number;
  totalCopies: number;
  availableCopies: number;
  language: 'English' | 'Urdu' | 'Arabic' | 'Other';
  condition: 'Brand New' | 'Good' | 'Fair' | 'Under Repair';
  isReferenceOnly: boolean;
  coverUrl: string;
  description: string;
  priceRs: number;
  callNumber: string;
}

const BookSchema = new Schema<IBook>(
  {
    accessionNo: { type: String, required: true, unique: true, uppercase: true, trim: true },
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    isbn: { type: String, default: 'N/A' },
    category: { type: String, default: 'General', index: true },
    department: { type: String, default: 'General', index: true },
    almariNo: { type: String, default: 'Almari #01' },
    shelfNo: { type: String, default: 'Shelf 1' },
    publisher: { type: String, default: 'Unknown' },
    edition: { type: String, default: '1st Edition' },
    year: { type: Number, default: new Date().getFullYear() },
    totalCopies: { type: Number, default: 1, min: 1 },
    availableCopies: { type: Number, default: 1, min: 0 },
    language: { type: String, enum: ['English', 'Urdu', 'Arabic', 'Other'], default: 'English' },
    condition: { type: String, enum: ['Brand New', 'Good', 'Fair', 'Under Repair'], default: 'Good' },
    isReferenceOnly: { type: Boolean, default: false },
    coverUrl: { type: String, default: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=500&auto=format&fit=crop&q=60' },
    description: { type: String, default: '' },
    priceRs: { type: Number, default: 0 },
    callNumber: { type: String, default: '000 GEN' }
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

// Disable MongoDB default language field override so Urdu / Arabic values work seamlessly
BookSchema.index(
  { title: 'text', author: 'text', isbn: 'text', accessionNo: 'text', category: 'text' },
  { default_language: 'none', language_override: 'none' }
);

export const BookModel = model<IBook>('Book', BookSchema);
