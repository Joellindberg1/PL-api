import "dotenv/config";
import express from "express";
import { getApiInfo } from "./lib/apiInfo";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

app.get("/", (_req, res) => {
  const apiData = getApiInfo();
  res.set('Content-Type', 'application/json');
  res.send(JSON.stringify(apiData, null, 2));
});

app.get("/api", (_req, res) => {
  const apiData = getApiInfo();
  res.set('Content-Type', 'application/json');
  res.send(JSON.stringify(apiData, null, 2));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});