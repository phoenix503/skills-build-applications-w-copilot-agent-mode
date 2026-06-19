import { model, Schema, Document, Types } from 'mongoose';

export interface ILeaderboardEntry extends Document {
  rank: number;
  user: Types.ObjectId;
  team?: Types.ObjectId;
  points: number;
  updatedAt: Date;
}

const leaderboardSchema = new Schema<ILeaderboardEntry>({
  rank: { type: Number, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  team: { type: Schema.Types.ObjectId, ref: 'Team' },
  points: { type: Number, required: true },
  updatedAt: { type: Date, default: Date.now },
});

export const LeaderboardEntry = model<ILeaderboardEntry>('LeaderboardEntry', leaderboardSchema);
