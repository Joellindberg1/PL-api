import { Router } from 'express';
import { TeamController } from './controller';

const router = Router();
const teamController = new TeamController();

router.get('/teams', teamController.getAllTeams);
router.get('/teams/list', teamController.getTeamsList);
router.get('/teams/:id', teamController.getTeamById);

export default router;