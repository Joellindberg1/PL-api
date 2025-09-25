// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
import { teams } from "./seed-data/teams";

const prisma = new PrismaClient();

async function main() {
  console.log("🧹 Rensar tabellen team...");
  await prisma.team.deleteMany();

  console.log("📝 Skapar team (bulk)...");
  await prisma.team.createMany({
    data: teams.map(t => ({
      name: t.name,
      arena: t.arena,
      arenaCapacity: t.arenaCapacity,
      city: t.city,
      manager: t.manager,
      premierleagueTitles: t.premierleagueTitles,
      faCupTitles: t.faCupTitles,
      marathonTablePlacement: t.marathonTablePlacement,
      marathonTablePoints: t.marathonTablePoints,
      recordGoalscorer: t.recordGoalscorer,
      recordGoals: t.recordGoals,
      homeshirtsColor: t.homeshirtsColor,
      awayshirtsColor: t.awayshirtsColor,
      clubStarted: new Date(t.clubStarted)
    }))
  });

  console.log("✅ Seed klar!");
}

main()
  .catch((e) => {
    console.error("Seed fel:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
