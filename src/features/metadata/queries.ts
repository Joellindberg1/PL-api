import { prisma } from '../../lib/database';

export class MetadataQueries {
  // Basic counts and aggregations
  async getTeamCount() {
    return await prisma.team.count();
  }

  async getTitleStats() {
    return await prisma.team.aggregate({
      _sum: {
        premierleagueTitles: true,
        faCupTitles: true
      },
      _avg: {
        premierleagueTitles: true,
        faCupTitles: true
      }
    });
  }

  async getClubAgeStats() {
    const teams = await prisma.team.findMany({
      select: {
        name: true,
        clubStarted: true
      },
      orderBy: {
        clubStarted: 'asc'
      }
    });

    return teams;
  }

  // Championship statistics
  async getChampionshipData() {
    return await prisma.team.findMany({
      select: {
        name: true,
        premierleagueTitles: true,
        faCupTitles: true
      },
      orderBy: {
        premierleagueTitles: 'desc'
      }
    });
  }

  // Stadium capacity statistics
  async getStadiumStats() {
    return await prisma.team.findMany({
      select: {
        name: true,
        arena: true,
        arenaCapacity: true
      },
      orderBy: {
        arenaCapacity: 'desc'
      }
    });
  }

  async getCapacityAggregates() {
    return await prisma.team.aggregate({
      _sum: {
        arenaCapacity: true
      },
      _avg: {
        arenaCapacity: true
      },
      _max: {
        arenaCapacity: true
      },
      _min: {
        arenaCapacity: true
      }
    });
  }

  // Premier League stability analysis
  async getStabilityAnalysisData() {
    // Get all teams ordered by marathon table position
    const allTeams = await prisma.team.findMany({
      select: {
        name: true,
        marathonTablePlacement: true,
        marathonTablePoints: true
      },
      orderBy: {
        marathonTablePlacement: 'asc'
      }
    });

    return allTeams;
  }
}