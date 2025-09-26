export const apiInfo = {
  api: {
    name: "Premier League API",
    description: "REST API för Premier League lagstatistik och metadata. Tillhandahåller omfattande data för alla 20 Premier League-lag med historisk marathon table-analys.",
    version: "1.0.0",
    baseUrl: "/pl-api",
    author: "Backend F24 Course Project",
    documentation: "https://github.com/yourusername/PL-api#readme"
  },
  endpoints: {
    documentation: {
      urls: ["/", "/pl-api", "/pl-api/"],
      method: "GET",
      description: "API översikt och dokumentation (tillgänglig på flera endpoints)",
      responseFormat: "application/json"
    },
    teams: {
      all: {
        url: "/pl-api/teams",
        method: "GET",
        description: "Hämta alla lag med fullständig data inklusive arena, manager, titlar och marathon table-statistik",
        responseExample: {
          success: true,
          data: [
            {
              id: 1,
              name: "Arsenal",
              arena: "Emirates Stadium",
              arenaCapacity: 60704,
              city: "London",
              manager: "Mikel Arteta",
              premierleagueTitles: 3,
              faCupTitles: 14,
              marathonTablePlacement: 4,
              marathonTablePoints: 1326
            }
          ]
        }
      },
      list: {
        url: "/pl-api/teams/list", 
        method: "GET",
        description: "Hämta alla lag med minimal data (endast id och namn) - optimerat för dropdown-listor och översikter",
        responseExample: {
          success: true,
          data: [
            { id: 1, name: "Arsenal" },
            { id: 2, name: "Aston Villa" }
          ]
        }
      },
      single: {
        url: "/pl-api/teams/{id}",
        method: "GET",
        description: "Hämta specifikt lag baserat på ID med alla tillgängliga fält",
        parameters: {
          id: "number - Team ID (1-20)"
        },
        responseExample: {
          success: true,
          data: {
            id: 1,
            name: "Arsenal",
            arena: "Emirates Stadium",
            arenaCapacity: 60704,
            city: "London",
            manager: "Mikel Arteta",
            premierleagueTitles: 3,
            faCupTitles: 14,
            marathonTablePlacement: 4,
            marathonTablePoints: 1326,
            recordGoalscorer: "Thierry Henry",
            recordGoals: 228,
            homeshirtsColor: "Red/White",
            awayshirtsColor: "Yellow/Blue",
            clubStarted: 1886,
            lastPromotionYear: null,
            lastPromotionSeason: null,
            isFoundingMember: true
          }
        },
        errorExample: {
          success: false,
          error: {
            message: "Team not found",
            code: "TEAM_NOT_FOUND",
            statusCode: 404
          }
        }
      }
    },
    metadata: {
      summary: {
        url: "/pl-api/metadata/summary",
        method: "GET", 
        description: "Grundläggande statistik och översikt över alla lag - totaler, genomsnitt och extremvärden",
        responseExample: {
          success: true,
          data: {
            total_teams: 20,
            average_capacity: 52618,
            total_capacity: 1052360,
            oldest_club: { name: "Nottingham Forest", founded: 1865 },
            newest_club: { name: "Brighton & Hove Albion", founded: 1901 },
            total_premier_league_titles: 66,
            total_fa_cup_titles: 149
          }
        }
      },
      champions: {
        url: "/pl-api/metadata/champions",
        method: "GET",
        description: "Premier League och FA Cup mästare - lista över alla lag med deras titlar sorterade",
        responseExample: {
          success: true,
          data: {
            premier_league_champions: [
              { name: "Manchester United", titles: 13 },
              { name: "Manchester City", titles: 8 }
            ],
            fa_cup_champions: [
              { name: "Arsenal", titles: 14 },
              { name: "Manchester United", titles: 12 }
            ]
          }
        }
      },
      stadiums: {
        url: "/pl-api/metadata/stadiums",
        method: "GET",
        description: "Arena statistik och kapacitetsanalys - störst, minst, genomsnitt per stad och region",
        responseExample: {
          success: true,
          data: {
            total_capacity: 1052360,
            average_capacity: 52618,
            largest_stadium: { name: "Old Trafford", capacity: 74310, team: "Manchester United" },
            smallest_stadium: { name: "Vitality Stadium", capacity: 11329, team: "AFC Bournemouth" },
            stadiums_by_city: {
              "London": { count: 6, total_capacity: 333588 },
              "Manchester": { count: 2, total_capacity: 129310 }
            }
          }
        }
      },
      stabilityAnalysis: {
        url: "/pl-api/metadata/promotion-analysis",
        method: "GET",
        description: "Premier League stabilitetsanalys baserat på marathon table - fördelning av poäng och positioner mellan olika grupper (Big 6, Mid-table, etc.)",
        responseExample: {
          success: true,
          data: {
            groups: {
              big_six: { teams: 6, avg_points: 1356, positions: "1-6" },
              mid_table: { teams: 8, avg_points: 1178, positions: "7-14" },
              lower_mid: { teams: 4, avg_points: 1087, positions: "15-18" },
              bottom_three: { teams: 2, avg_points: 1032, positions: "19-20" }
            },
            stability_metrics: {
              coefficient_of_variation: 0.12,
              point_spread: 324,
              competition_level: "High"
            }
          }
        }
      }
    }
  },
  responseFormats: {
    success: {
      structure: {
        success: true,
        data: "// API response data"
      },
      contentType: "application/json",
      statusCode: 200
    },
    error: {
      structure: {
        success: false,
        error: {
          message: "Human readable error message",
          code: "MACHINE_READABLE_ERROR_CODE",
          statusCode: "HTTP status code number"
        }
      },
      contentType: "application/json",
      statusCodes: [400, 404, 500]
    }
  },
  features: {
    teams: {
      count: 20,
      description: "Fullständiga profiler för alla Premier League-lag säsongen 2025/26",
      dataFields: [
        "id", "name", "arena", "arenaCapacity", "city", "manager",
        "premierleagueTitles", "faCupTitles", "marathonTablePlacement", "marathonTablePoints",
        "recordGoalscorer", "recordGoals", "homeshirtsColor", "awayshirtsColor", "clubStarted",
        "lastPromotionYear", "lastPromotionSeason", "isFoundingMember"
      ],
      specialFeatures: [
        "Marathon Table historisk statistik",
        "Fullständig arena information",
        "Rekordmålskyttar och målstatistik",
        "Grundarmedlem status",
        "Senaste uppflyttning till Premier League"
      ]
    },
    metadata: {
      types: ["summary", "champions", "stadiums", "promotion-analysis"],
      description: "Aggregerad statistik och djupgående analyser baserat på team-data",
      analyticsFeatures: [
        "Kapacitetsanalys per stad och region",
        "Historisk titelfördelning",
        "Marathon table stabilitetsanalys",
        "Konkurrenskraft och jämförelsestatistik"
      ]
    },
    technicalFeatures: {
      architecture: "RESTful API med feature-baserad struktur",
      database: "MySQL med Prisma ORM",
      typescript: "Fullständig typsäkerhet",
      errorHandling: "Strukturerad felhantering med HTTP status codes",
      logging: "Centraliserad logging med endpoint mapping",
      performance: "Optimerade queries med indexering"
    }
  },
  usage: {
    baseURL: "http://localhost:3000",
    authentication: "None required (public API)",
    rateLimit: "None currently implemented",
    cors: "Enabled for all origins in development",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    examples: {
      curl: {
        getAllTeams: "curl http://localhost:3000/pl-api/teams",
        getTeamById: "curl http://localhost:3000/pl-api/teams/1",
        getMetadata: "curl http://localhost:3000/pl-api/metadata/summary"
      },
      javascript: {
        fetch: "const response = await fetch('http://localhost:3000/pl-api/teams'); const data = await response.json();",
        axios: "const { data } = await axios.get('http://localhost:3000/pl-api/teams');"
      }
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