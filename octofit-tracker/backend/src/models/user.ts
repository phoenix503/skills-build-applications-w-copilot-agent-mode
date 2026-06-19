import { model, Schema, Document, Types } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  role: string;
  team?: Types.ObjectId;
  joinedAt: Date;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true, default: 'member' },
  team: { type: Schema.Types.ObjectId, ref: 'Team' },
  joinedAt: { type: Date, default: Date.now },
});

export const User = model<IUser>('User', userSchema);
