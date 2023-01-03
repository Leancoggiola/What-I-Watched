import express from 'express';
const router = express.Router();

import { getContent, getOverviewDetails } from './controller.js';

router.get('/getContent', getContent)
router.get('/getOverviewDetails', getOverviewDetails)

export default router;