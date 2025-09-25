import { TeamRepository } from './repo';
import { NotFoundError } from '@/shared/errors';

export class TeamService {
  private teamRepo: TeamRepository;

  constructor() {
    this.teamRepo = new TeamRepository();
  }

  async getAllTeams() {
    return await this.teamRepo.findAll();
  }

  async getTeamsList() {
    return await this.teamRepo.findAllMinimal();
  }

  async getTeamById(id: number) {
    const team = await this.teamRepo.findById(id);
    if (!team) {
      throw new NotFoundError('Team', id);
    }
    return team;
  }
}