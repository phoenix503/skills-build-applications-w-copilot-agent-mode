import express from 'express';
import { API_BASE_URL, PORT } from './config';
import usersRoutes from './routes/users';
import teamsRoutes from './routes/teams';
import activitiesRoutes from './routes/activities';
import leaderboardRoutes from './routes/leaderboard';
import workoutsRoutes from './routes/workouts';

const app = express();

app.use(express.json());

app.get('/api', (_req, res) => {
  res.json({
    message: 'OctoFit Tracker API',
    port: PORT,
    apiBaseUrl: API_BASE_URL,
    endpoints: [
      '/api/users/',
      '/api/teams/',
      '/api/activities/',
      '/api/leaderboard/',
      '/api/workouts/',
    ],
  });
});

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    port: PORT,
    apiBaseUrl: API_BASE_URL,
  });
});

app.use('/api/users', usersRoutes);
app.use('/api/teams', teamsRoutes);
app.use('/api/activities', activitiesRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/workouts', workoutsRoutes);

export default app;
