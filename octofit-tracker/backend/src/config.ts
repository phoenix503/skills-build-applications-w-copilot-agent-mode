export const PORT = Number(process.env.PORT ?? 8000);
export const MONGO_URI = process.env.MONGO_URI ?? 'mongodb://127.0.0.1:27017/octofit_db';
export const CODESPACE_NAME = process.env.CODESPACE_NAME ?? '';
export const API_BASE_URL = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev`
  : `http://localhost:${PORT}`;
