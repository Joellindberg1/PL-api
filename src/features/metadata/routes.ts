import { Router } from 'express';
import { MetadataController } from './controller';

const router = Router();
const metadataController = new MetadataController();

// Metadata endpoints
router.get('/metadata/summary', metadataController.getSummary);
router.get('/metadata/champions', metadataController.getChampions);
router.get('/metadata/stadiums', metadataController.getStadiums);
router.get('/metadata/promotion-analysis', metadataController.getPromotionAnalysis);

export default router;