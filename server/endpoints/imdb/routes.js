import express from 'express';
const router = express.Router();

import { getContent } from './controller.js';

router.use("/getContent", getContent)

export default router;