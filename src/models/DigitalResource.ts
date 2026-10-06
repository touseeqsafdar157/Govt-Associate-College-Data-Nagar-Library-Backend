import { Schema, model, Document } from 'mongoose';

export interface IDigitalResource extends Document {
  id?: string;
  title: string;
  type: 'Past Paper' | 'E-Book' | 'Lecture Notes' | 'Syllabus' | 'Model Paper';
  subject: string;
  classGrade: string;
  boardOrUniversity: string;
  year: string;
  pages: number;
  fileSizeMb: number;
  downloadUrl: string;
  viewsCount: number;
}

const DigitalResourceSchema = new Schema<IDigitalResource>(
  {
    title: { type: String, required: true, trim: true },
    type: {
      type: String,
      enum: ['Past Paper', 'E-Book', 'Lecture Notes', 'Syllabus', 'Model Paper'],
      default: 'Past Paper'
    },
    subject: { type: String, required: true },
    classGrade: { type: String, default: '1st Year (General)' },
    boardOrUniversity: { type: String, default: 'BISE Lahore' },
    year: { type: String, default: '2024' },
    pages: { type: Number, default: 10 },
    fileSizeMb: { type: Number, default: 5.0 },
    downloadUrl: { type: String, default: '#' },
    viewsCount: { type: Number, default: 0 }
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

export const DigitalResourceModel = model<IDigitalResource>('DigitalResource', DigitalResourceSchema);
