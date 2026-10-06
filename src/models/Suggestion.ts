import { Schema, model, Document } from 'mongoose';

export interface ISuggestion extends Document {
  id?: string;
  title: string;
  author: string;
  suggestedByRollNo: string;
  suggestedByName: string;
  studentClass: string;
  department: string;
  reason: string;
  date: string;
  status: 'Pending' | 'Approved' | 'Procured' | 'Rejected';
}

const SuggestionSchema = new Schema<ISuggestion>(
  {
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    suggestedByRollNo: { type: String, default: 'Patron' },
    suggestedByName: { type: String, default: 'Student' },
    studentClass: { type: String, default: 'General' },
    department: { type: String, default: 'General' },
    reason: { type: String, default: '' },
    date: { type: String, default: () => new Date().toISOString().split('T')[0] },
    status: {
      type: String,
      enum: ['Pending', 'Approved', 'Procured', 'Rejected'],
      default: 'Pending'
    }
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

export const SuggestionModel = model<ISuggestion>('Suggestion', SuggestionSchema);
