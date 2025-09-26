# Premier League API

REST API för Premier League lag och statistik, byggd med Node.js och TypeScript.

## Vad gör detta repo?

API:et tillhandahåller data för alla 20 Premier League-lag i säsongen 2025/26:
- Lagdata (namn, arena, manager, titlar)
- Statistik och metadata 
- Marathon table historisk data

## Teknisk stack

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **TypeScript** - Typsäkerhet
- **Prisma** - Database ORM
- **MySQL** - Databas

## Installation

1. **Klona repo**
   ```bash
   git clone <repo-url>
   cd PL-api
   ```

2. **Installera beroenden**
   ```bash
   npm install
   ```

3. **Skapa .env fil**
   ```env
   DATABASE_URL="mysql://username:password@localhost:3306/pl_database"
   PORT=3000
   ```

4. **Sätt upp databas**
   ```bash
   npx prisma migrate deploy
   npx prisma db seed
   ```

5. **Starta server**
   ```bash
   npm run dev
   ```

## API Exempel Endpoints

- `GET /` - API dokumentation
- `GET /pl-api/teams` - Alla lag
- `GET /pl-api/teams/{id}` - Specifikt lag
- `GET /pl-api/metadata/summary` - Statistik översikt

## Användning Exempel

```bash
# Hämta alla lag
curl http://localhost:3000/pl-api/teams

# Hämta lag med ID 1  
curl http://localhost:3000/pl-api/teams/1

# Hämta statistik
curl http://localhost:3000/pl-api/metadata/summary
```

## Dependencies

### Produktionsberoenden
- **@prisma/client** - Databas ORM client
- **dotenv** - Miljövariabel hantering  
- **express** - Web framework

### Utvecklingsberoenden
- **@types/express** - TypeScript typer för Express
- **@types/node** - TypeScript typer för Node.js
- **typescript** - TypeScript kompilator
- **tsx** - TypeScript execution för development
- **nodemon** - Auto-restart för utveckling
- **prisma** - Databas toolkit och CLI
- **eslint** - Code linting
- **prettier** - Code formatting

## Mapparkitektur

```
PL-api/
├── prisma/                 # Databas schema och migrations
│   ├── schema.prisma      # Databas schema definition
│   ├── seed.ts           # Seed data för databasen
│   └── migrations/       # Databas migrations
├── src/                   # Källkod
│   ├── app/              # Express app konfiguration
│   │   ├── app.ts        # Huvudapp setup
│   │   ├── server.ts     # Server startup
│   │   └── middleware/   # Custom middleware
│   ├── features/         # Feature-baserade moduler
│   │   ├── teams/        # Team-relaterad funktionalitet
│   │   └── metadata/     # Metadata och statistik
│   ├── lib/             # Delade bibliotek
│   ├── shared/          # Delade typer och utilities
│   └── index.ts         # Application entry point
├── package.json         # NPM dependencies och scripts
├── tsconfig.json       # TypeScript konfiguration
├── .env                # Miljövariabler (skapas av dig)
└── README.md           # Denna fil
```
