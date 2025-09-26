import { Request, Response } from 'express';
import { MetadataService } from './service';
import { asyncHandler } from '@/app/middleware/errorHandler';
import { logger } from '@/app/middleware/logger';

export class MetadataController {
  private metadataService: MetadataService;

  constructor() {
    this.metadataService = new MetadataService();
  }

  getSummary = asyncHandler(async (req: Request, res: Response) => {
    logger.controllerAction('GET /pl-api/metadata/summary');
    const summary = await this.metadataService.getSummaryStats();

    res.json({
      success: true,
      data: summary
    });
  });

  getChampions = asyncHandler(async (req: Request, res: Response) => {
    logger.controllerAction('GET /pl-api/metadata/champions');
    const champions = await this.metadataService.getChampionshipStats();

    res.json({
      success: true,
      data: champions
    });
  });

  getStadiums = asyncHandler(async (req: Request, res: Response) => {
    logger.controllerAction('GET /pl-api/metadata/stadiums');
    const stadiums = await this.metadataService.getStadiumStats();

    res.json({
      success: true,
      data: stadiums
    });
  });

  getPromotionAnalysis = asyncHandler(async (req: Request, res: Response) => {
    logger.controllerAction('GET /pl-api/metadata/promotion-analysis');
    const stabilityAnalysis = await this.metadataService.getStabilityAnalysis();

    res.json({
      success: true,
      data: stabilityAnalysis
    });
  });
}
