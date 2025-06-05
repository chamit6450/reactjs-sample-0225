import { Document, Types } from 'mongoose';

export interface ITask extends Document {
  _id: Types.ObjectId;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done';
  createdAt: Date;
  pubKey: string;
}

export interface IUser extends Document {
  pubKey: string;
} 