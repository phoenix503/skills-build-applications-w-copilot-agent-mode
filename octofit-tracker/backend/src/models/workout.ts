import { model, Schema, Document, Types } from 'mongoose';

const exerciseSchema = new Schema({
  name: { type: String, required: true },
  sets: { type: Number, required: true },
  reps: { type: Number, required: true },
  durationMinutes: { type: Number, required: true },
});

export interface IWorkout extends Document {
  title: string;
  description: string;
  difficulty: string;
  durationMinutes: number;
  exercises: Array<{ name: string; sets: number; reps: number; durationMinutes: number }>;
  createdAt: Date;
}

const workoutSchema = new Schema<IWorkout>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  difficulty: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  exercises: { type: [exerciseSchema], required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Workout = model<IWorkout>('Workout', workoutSchema);
