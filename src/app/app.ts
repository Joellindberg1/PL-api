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
  const apiDocsHandler = (_req: any, res: any) => {
    const apiData = getApiInfo();
    res.json(apiData);
  };
  
  app.get("/", apiDocsHandler);
  app.get("/pl-api", apiDocsHandler);
  app.get("/pl-api/", apiDocsHandler);
  
  // Feature routes
  app.use('/pl-api', teamRoutes);
  app.use('/pl-api', metadataRoutes);

  // Error handling middleware (must be last)
  app.use(errorHandler);

  return app;
};