import express from 'express';
const router = express.Router();

import { getPermissionList } from './controller.js';

router.get('/getPermissionList', getPermissionList);

export default router;