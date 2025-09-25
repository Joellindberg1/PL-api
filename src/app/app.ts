import express from 'express';
import { getApiInfo } from '../lib/apiInfo';
import teamRoutes from '../features/teams/routes';
import { errorHandler } from './middleware/errorHandler';

export const createApp = () => {
  const app = express();

  // Middleware
  app.use(express.json());

  // API Documentation endpoints
  app.get("/", (_req, res) => {
    const apiData = getApiInfo();
    res.set('Content-Type', 'application/json');
    res.send(JSON.stringify(apiData, null, 2));
  });
  // Feature routes
  app.use('/api', teamRoutes);

  // Error handling middleware (must be last)
  app.use(errorHandler);

  return app;
};