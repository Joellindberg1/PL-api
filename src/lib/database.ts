// Prisma client setup för hela appen
import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();
export const connectDB = async () => { /* connection logic */ }