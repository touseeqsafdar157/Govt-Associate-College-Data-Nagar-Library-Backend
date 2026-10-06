import { Schema, model, Document } from 'mongoose';

export interface IAlmari extends Document {
  id?: string;
  almariCode: string;
  name: string;
  department: string;
  locationDesc: string;
  shelves: string[];
}

const AlmariSchema = new Schema<IAlmari>(
  {
    almariCode: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    department: { type: String, default: 'General' },
    locationDesc: { type: String, default: 'Main Library Hall' },
    shelves: { type: [String], default: ['Shelf 1', 'Shelf 2', 'Shelf 3'] }
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

export const AlmariModel = model<IAlmari>('Almari', AlmariSchema);
