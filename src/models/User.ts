import { Schema, model, Document } from 'mongoose';
import { UserRole } from '../types';

export interface IUser extends Document {
  id?: string;
  username: string;
  passwordHash: string;
  name: string;
  role: UserRole;
  email: string;
}

const UserSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, enum: ['student', 'teacher', 'librarian', 'admin'], default: 'student' },
    email: { type: String, default: '' }
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = (ret as any)._id?.toString();
        delete (ret as any)._id;
        delete (ret as any).__v;
        delete (ret as any).passwordHash;
      }
    }
  }
);

export const UserModel = model<IUser>('User', UserSchema);
