import { Request, Response } from 'express';
import { TeamService } from './service';
import { asyncHandler } from '@/app/middleware/errorHandler';
import { ValidationError } from '@/shared/errors';
import { logger } from '@/app/middleware/logger';

export class TeamController {
  private teamService: TeamService;

  constructor() {
    this.teamService = new TeamService();
  }

  getAllTeams = asyncHandler(async (req: Request, res: Response) => {
    logger.controllerAction('GET /pl-api/teams');
    const teams = await this.teamService.getAllTeams();

    res.json({
      success: true,
      count: teams.length,
      data: teams,
    });
  });

  getTeamsList = asyncHandler(async (req: Request, res: Response) => {
    logger.controllerAction('GET /pl-api/teams/list');
    const teams = await this.teamService.getTeamsList();

    res.json({
      success: true,
      data: teams,
    });
  });

  getTeamById = asyncHandler(async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      throw new ValidationError("Invalid team ID format");
    }

    logger.controllerAction('GET /pl-api/teams/:id');
    const team = await this.teamService.getTeamById(id);
    res.json({
      success: true,
      data: team,
    });
  });
}