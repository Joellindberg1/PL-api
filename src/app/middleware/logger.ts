// src/app/middleware/logger.ts
export const logger = {
  controllerAction: (endpoint: string) => {
    // Uppslagstabell med alla våra endpoints
    const actionMessages: Record<string, string> = {
      'GET /pl-api/teams': 'Getting all teams',
      'GET /pl-api/teams/list': 'Getting minimal teams list', 
      'GET /pl-api/teams/:id': 'Getting team by ID',
      'GET /pl-api/metadata/summary': 'Getting metadata summary',
      'GET /pl-api/metadata/champions': 'Getting championship statistics',
      'GET /pl-api/metadata/stadiums': 'Getting stadium statistics',
      'GET /pl-api/metadata/promotion-analysis': 'Getting Premier League stability analysis'
    };
    
    const message = actionMessages[endpoint] || `Processing ${endpoint}`;
    console.log(`Controller: ${message}...`);
  }
};