import { model, Schema, Document, Types } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  description: string;
  captain?: Types.ObjectId;
  members: Types.ObjectId[];
  createdAt: Date;
}

const teamSchema = new Schema<ITeam>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  captain: { type: Schema.Types.ObjectId, ref: 'User' },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now },
});

export const Team = model<ITeam>('Team', teamSchema);
