import mongoose from 'mongoose';
import app from './app';
import { MONGO_URI, PORT } from './config';

mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB on port 27017'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
