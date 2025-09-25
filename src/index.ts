import "dotenv/config";
import express from "express";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ message: "Premier League API" });
});

app.get("/api", (_req, res) => {
  res.json({
    name: "Premier League API",
    version: "1.0.0",
    description: "API för Premier League data",
    endpoints: {
      "/api/teams": "Alla lag",
      "/api/teams/{id}": "Specifikt lag",
      "/api/health": "Server status"
    },
    data_available: {
      teams: "Premier League lag med statistik",
      stadiums: "Arena information",
      managers: "Tränare information"
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});