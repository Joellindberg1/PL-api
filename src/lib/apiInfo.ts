export const apiInfo = {
  api: {
    name: "Premier League API",
    Hur: "Nedan finnder du information om API:et och hur du navigerar dig mellan de olika endpointsen!",
    version: "1.0.0",
    description: "API för Premier League data"
  },
  endpoints: {
    base: {
      url: "/api",
      description: "API översikt"
    },
    teams: {
      all: {
        url: "/api/teams",
        method: "GET",
        description: "Hämta alla lag"
      },
      single: {
        url: "/api/teams/{id}",
        method: "GET",
        description: "Hämta specifikt lag"
      }
    },
    health: {
      url: "/api/health",
      method: "GET",
      description: "Server status"
    }
  },
  data: {
    teams: {
      count: 20,
      fields: [
        "name",
        "arena", 
        "city",
        "manager",
        "titles",
        "statistics"
      ]
    }
  }
};

export const getApiInfo = () => ({
  ...apiInfo,
  server: {
    status: "running",
    timestamp: new Date().toISOString()
  }
});