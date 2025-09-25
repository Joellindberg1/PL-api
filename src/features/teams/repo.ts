import { prisma } from '../../lib/database';

export class TeamRepository {
  async findAll() {
    return await prisma.team.findMany({
      orderBy: { name: 'asc' }
    });
  }

  async findAllMinimal() {
    return await prisma.team.findMany({
      select: {
        id: true,
        name: true
      },
      orderBy: { id: 'asc' }
    });
  }

  async findById(id: number) {
    return await prisma.team.findUnique({
      where: { id }
    });
  }
}