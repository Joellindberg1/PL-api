import express from 'express';
import { getApiInfo } from '../lib/apiInfo';
import teamRoutes from '../features/teams/routes';
import metadataRoutes from '../features/metadata/routes';
import { errorHandler } from './middleware/errorHandler';
import { configureApp } from './middleware/appConfig';

export const createApp = () => {
  const app = express();

  // Application configuration
  configureApp(app);

  // Middleware
  app.use(express.json());

  // API Documentation endpoints
  app.get("/", (_req, res) => {
    const apiData = getApiInfo();
    res.json(apiData);
  });
  
  // Feature routes
  app.use('/pl-api', teamRoutes);
  app.use('/pl-api', metadataRoutes);

  // Error handling middleware (must be last)
  app.use(errorHandler);

  return app;
};