import mongoose from 'mongoose';
import { MONGO_URI } from '../config';
import { User } from '../models/user';
import { Team } from '../models/team';
import { Activity } from '../models/activity';
import { Workout } from '../models/workout';
import { LeaderboardEntry } from '../models/leaderboard';

// Seed the octofit_db database with test data
async function seed() {
  console.log('Seed the octofit_db database with test data');
  await mongoose.connect(MONGO_URI);

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Workout.deleteMany({}),
    LeaderboardEntry.deleteMany({}),
  ]);

  const teams = await Team.create([
    { name: 'Velocity Vipers', description: 'High-energy team focused on speed and endurance.' },
    { name: 'Core Crushers', description: 'Strength training specialists with a competitive edge.' },
  ]);

  const users = await User.create([
    { name: 'Ava Clarke', email: 'ava.clarke@example.com', role: 'athlete', team: teams[0]._id },
    { name: 'Noah Patel', email: 'noah.patel@example.com', role: 'athlete', team: teams[0]._id },
    { name: 'Mia Brooks', email: 'mia.brooks@example.com', role: 'coach', team: teams[1]._id },
    { name: 'Leo Johnson', email: 'leo.johnson@example.com', role: 'athlete', team: teams[1]._id },
  ]);

  teams[0].members = [users[0]._id, users[1]._id];
  teams[1].members = [users[2]._id, users[3]._id];
  teams[0].captain = users[0]._id;
  teams[1].captain = users[2]._id;
  await Promise.all(teams.map((team) => team.save()));

  const activities = await Activity.create([
    { user: users[0]._id, type: 'run', durationMinutes: 45, caloriesBurned: 510, date: new Date('2026-06-15T07:30:00Z'), notes: 'Morning hill repeats' },
    { user: users[1]._id, type: 'cycle', durationMinutes: 65, caloriesBurned: 760, date: new Date('2026-06-16T09:00:00Z'), notes: 'Tempo ride with teammates' },
    { user: users[3]._id, type: 'strength', durationMinutes: 50, caloriesBurned: 430, date: new Date('2026-06-15T18:00:00Z'), notes: 'Full-body circuit' },
  ]);

  const workouts = await Workout.create([
    { title: 'Endurance Builder', description: 'A progressive workout for stamina and aerobic recovery.', difficulty: 'medium', durationMinutes: 55, exercises: [ { name: 'Jog', sets: 1, reps: 1, durationMinutes: 20 }, { name: 'Row', sets: 3, reps: 1, durationMinutes: 15 }, { name: 'Core plank', sets: 3, reps: 1, durationMinutes: 5 } ] },
    { title: 'Strength Sprint', description: 'Power-focused combination of lifts and sprints.', difficulty: 'hard', durationMinutes: 45, exercises: [ { name: 'Squat press', sets: 4, reps: 8, durationMinutes: 12 }, { name: 'Kettlebell swings', sets: 4, reps: 15, durationMinutes: 10 }, { name: 'Sprint intervals', sets: 8, reps: 1, durationMinutes: 10 } ] },
  ]);

  const leaderboard = await LeaderboardEntry.create([
    { rank: 1, user: users[0]._id, team: teams[0]._id, points: 1280 },
    { rank: 2, user: users[1]._id, team: teams[0]._id, points: 1195 },
    { rank: 3, user: users[3]._id, team: teams[1]._id, points: 1120 },
  ]);

  console.log(`Inserted ${users.length} users, ${teams.length} teams, ${activities.length} activities, ${workouts.length} workouts, ${leaderboard.length} leaderboard entries.`);
  await mongoose.disconnect();
  console.log('Seed complete.');
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
