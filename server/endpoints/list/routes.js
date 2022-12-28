import express from 'express';
const router = express.Router();

import { getList, postItemToList } from './controller.js';

router.get('/getList', getList);
router.post('/postItemToList', postItemToList)

export default router;