import { MetadataQueries } from './queries';

export class MetadataService {
  private metadataQueries: MetadataQueries;

  constructor() {
    this.metadataQueries = new MetadataQueries();
  }

  async getSummaryStats() {
    const teamCount = await this.metadataQueries.getTeamCount();
    const titleStats = await this.metadataQueries.getTitleStats();
    const clubAgeData = await this.metadataQueries.getClubAgeStats();

    // Calculate club ages
    const currentYear = new Date().getFullYear();
    const clubAges = clubAgeData.map(team => ({
      name: team.name,
      age: currentYear - new Date(team.clubStarted).getFullYear()
    }));

    const averageAge = clubAges.reduce((sum, club) => sum + club.age, 0) / clubAges.length;
    const oldestClub = clubAges.reduce((oldest, current) => 
      current.age > oldest.age ? current : oldest
    );
    const newestClub = clubAges.reduce((newest, current) => 
      current.age < newest.age ? current : newest
    );

    return {
      totalTeams: teamCount,
      totalPremierLeagueTitles: titleStats._sum.premierleagueTitles || 0,
      totalFACupTitles: titleStats._sum.faCupTitles || 0,
      averageClubAge: Math.round(averageAge * 10) / 10, // Round to 1 decimal
      oldestClub: `${oldestClub.name} (${currentYear - oldestClub.age})`,
      newestClub: `${newestClub.name} (${currentYear - newestClub.age})`
    };
  }

  async getChampionshipStats() {
    const championshipData = await this.metadataQueries.getChampionshipData();

    // Premier League champions (only teams with titles)
    const plChampions = championshipData
      .filter(team => team.premierleagueTitles > 0)
      .map(team => ({
        team: team.name,
        titles: team.premierleagueTitles
      }))
      .sort((a, b) => b.titles - a.titles);

    // FA Cup champions (only teams with titles)
    const faCupChampions = championshipData
      .filter(team => team.faCupTitles > 0)
      .map(team => ({
        team: team.name,
        titles: team.faCupTitles
      }))
      .sort((a, b) => b.titles - a.titles);

    const titlelessTeams = championshipData.filter(team => team.premierleagueTitles === 0).length;
    const cuplessTeams = championshipData.filter(team => team.faCupTitles === 0).length;

    return {
      premierLeague: {
        champions: plChampions,
        titlelessTeams: titlelessTeams
      },
      faCup: {
        champions: faCupChampions,
        cuplessTeams: cuplessTeams
      }
    };
  }

  async getStadiumStats() {
    const stadiumData = await this.metadataQueries.getStadiumStats();
    const capacityAggregates = await this.metadataQueries.getCapacityAggregates();

    // Sort by capacity for scenarios
    const sortedByCapacity = [...stadiumData].sort((a, b) => b.arenaCapacity - a.arenaCapacity);
    
    // Get top 10, middle 10, and bottom 10
    const top10 = sortedByCapacity.slice(0, 10);
    const middle10 = sortedByCapacity.slice(5, 15); // Middle 10 teams (indices 5-14)
    const bottom10 = sortedByCapacity.slice(-10);

    // Calculate weekend scenarios
    const top10Total = top10.reduce((sum, team) => sum + team.arenaCapacity, 0);
    const middle10Total = middle10.reduce((sum, team) => sum + team.arenaCapacity, 0);
    const bottom10Total = bottom10.reduce((sum, team) => sum + team.arenaCapacity, 0);
    const averageWeekendCapacity = middle10Total; // 10 matches with middle-sized stadiums

    // Find largest and smallest
    const largest = sortedByCapacity[0];
    const smallest = sortedByCapacity[sortedByCapacity.length - 1];

    return {
      capacity: {
        totalAllStadiums: capacityAggregates._sum.arenaCapacity || 0,
        averageCapacity: Math.round(capacityAggregates._avg.arenaCapacity || 0),
        largest: {
          arena: largest.arena,
          capacity: largest.arenaCapacity,
          team: largest.name
        },
        smallest: {
          arena: smallest.arena,
          capacity: smallest.arenaCapacity,
          team: smallest.name
        }
      },
      weekendScenarios: {
        if10BiggestHaveHome: top10Total,
        if10SmallestHaveHome: bottom10Total,
        averageWeekendCapacity: averageWeekendCapacity
      }
    };
  }

  async getStabilityAnalysis() {
    const teams = await this.metadataQueries.getStabilityAnalysisData();

    // Calculate total points
    const totalPoints = teams.reduce((sum, team) => sum + team.marathonTablePoints, 0);

    // Group teams by current PL position ranges
    const big6 = teams.slice(0, 6); // Positions 1-6
    const midTable = teams.slice(6, 12); // Positions 7-12  
    const lowerMid = teams.slice(12, 17); // Positions 13-17
    const relegationZone = teams.slice(17, 20); // Positions 18-20

    // Calculate points and percentages for each group
    const calculateGroupStats = (group: typeof teams, label: string, positions: string) => {
      const totalGroupPoints = group.reduce((sum, team) => sum + team.marathonTablePoints, 0);
      const percentage = Math.round((totalGroupPoints / totalPoints) * 100 * 10) / 10; // One decimal
      const teamNames = group.map(team => team.name);
      
      return {
        label,
        positions,
        teams: teamNames,
        totalPoints: totalGroupPoints,
        percentage,
        teamCount: group.length
      };
    };

    const big6Stats = calculateGroupStats(big6, "Big 6", "1-6");
    const midTableStats = calculateGroupStats(midTable, "Mid-table", "7-12");
    const lowerMidStats = calculateGroupStats(lowerMid, "Lower Mid", "13-17");
    const relegationStats = calculateGroupStats(relegationZone, "Bottom 3", "18-20");

    // Identify newcomers (2025 promoted teams)
    const newcomers = teams.filter(team => 
      team.name === "Sunderland" || team.name === "Burnley" || team.name === "Leeds United"
    );

    return {
      analysis: {
        season: "2025/26",
        totalTeams: teams.length,
        totalMarathonPoints: totalPoints,
        stabilityMetrics: {
          big6: big6Stats,
          midTable: midTableStats,
          lowerMid: lowerMidStats,
          relegationZone: relegationStats
        }
      },
      insights: [
        `Big 6 control ${big6Stats.percentage}% of all marathon table points`,
        `Mid-table teams (7-12) have ${midTableStats.percentage}% - ${midTableStats.percentage > 25 ? 'strong middle class' : 'weak middle tier'}`,
        `Bottom 3 teams have only ${relegationStats.percentage}% of points - ${relegationStats.percentage < 5 ? 'indicating many yo-yo teams' : 'showing some established lower-tier teams'}`,
        `Newcomers 2025: ${newcomers.map(t => `${t.name} (${t.marathonTablePoints} pts, pos ${t.marathonTablePlacement})`).join(', ')} - ${newcomers.filter(t => t.marathonTablePlacement <= 15).length > 0 ? 'some have Premier League experience' : 'all are struggling historically'}`
      ]
    };
  }
}