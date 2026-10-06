import { Schema, model, Document } from 'mongoose';

export interface IAnnouncement extends Document {
  id?: string;
  title: string;
  date: string;
  category: 'Notice' | 'Timing' | 'New Arrivals' | 'Exam Preparation' | 'Holiday';
  content: string;
  isUrgent: boolean;
}

const AnnouncementSchema = new Schema<IAnnouncement>(
  {
    title: { type: String, required: true, trim: true },
    date: { type: String, default: () => new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) },
    category: {
      type: String,
      enum: ['Notice', 'Timing', 'New Arrivals', 'Exam Preparation', 'Holiday'],
      default: 'Notice'
    },
    content: { type: String, required: true },
    isUrgent: { type: Boolean, default: false }
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

export const AnnouncementModel = model<IAnnouncement>('Announcement', AnnouncementSchema);
