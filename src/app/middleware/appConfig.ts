import { Express } from 'express';

/**
 * Configure Express application settings
 */
export const configureApp = (app: Express): void => {
  // Pretty-print all JSON responses with 2 spaces
  app.set('json spaces', 2);
  
  // Additional app configurations can be added here
  // app.set('trust proxy', true);
  // app.set('view engine', 'ejs');
};