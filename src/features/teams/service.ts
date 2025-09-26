import { TeamQueries } from './queries';
import { NotFoundError } from '@/shared/errors';

export class TeamService {
  private teamQueries: TeamQueries;

  constructor() {
    this.teamQueries = new TeamQueries();
  }

  async getAllTeams() {
    return await this.teamQueries.findAll();
  }

  async getTeamsList() {
    return await this.teamQueries.findAllMinimal();
  }

  async getTeamById(id: number) {
    const team = await this.teamQueries.findById(id);
    if (!team) {
      throw new NotFoundError('Team', id);
    }
    return team;
  }
}