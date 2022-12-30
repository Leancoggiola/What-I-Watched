import express from 'express';
const router = express.Router();

import { getContent } from './controller.js';

router.get('/getContent', getContent)

export default router;