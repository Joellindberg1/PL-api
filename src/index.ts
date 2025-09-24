import "dotenv/config";
import express from "express";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ message: "Premier League API" });
});

app.listen(PORT, () => {
  console.log(`Servern körs på http://localhost:${PORT}`);
});