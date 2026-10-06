import { Schema, model, Document } from 'mongoose';

export interface IFeedback extends Document {
  id?: string;
  name: string;
  rollNo?: string;
  userType: string;
  rating: number;
  category: string;
  message: string;
  createdAt: string;
}

const FeedbackSchema = new Schema<IFeedback>(
  {
    name: { type: String, default: 'Anonymous', trim: true },
    rollNo: { type: String },
    userType: { type: String, default: 'Student' },
    rating: { type: Number, default: 5, min: 1, max: 5 },
    category: { type: String, default: 'General Service' },
    message: { type: String, required: true },
    createdAt: { type: String, default: () => new Date().toISOString() }
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

export const FeedbackModel = model<IFeedback>('Feedback', FeedbackSchema);
