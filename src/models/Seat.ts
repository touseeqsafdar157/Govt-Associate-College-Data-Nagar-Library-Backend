import { Schema, model, Document } from 'mongoose';

export interface ISeat extends Document {
  id?: number;
  seatId: number;
  seatNumber: string;
  zone: 'Window Side' | 'Quiet Study Zone' | 'Discussion Corner' | 'Digital Research';
  status: 'Available' | 'Occupied' | 'Reserved';
  currentOccupantRollNo?: string;
  currentOccupantName?: string;
  bookedUntil?: string;
}

const SeatSchema = new Schema<ISeat>(
  {
    seatId: { type: Number, required: true, unique: true },
    seatNumber: { type: String, required: true },
    zone: {
      type: String,
      enum: ['Window Side', 'Quiet Study Zone', 'Discussion Corner', 'Digital Research'],
      default: 'Quiet Study Zone'
    },
    status: { type: String, enum: ['Available', 'Occupied', 'Reserved'], default: 'Available' },
    currentOccupantRollNo: { type: String },
    currentOccupantName: { type: String },
    bookedUntil: { type: String }
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret.seatId;
        delete (ret as any)._id;
        delete (ret as any).__v;
      }
    }
  }
);

export const SeatModel = model<ISeat>('Seat', SeatSchema);
