import express from 'express';
const router = express.Router();

import { getList, postItemToList, putChangeItemOnList, deleteItemFromList } from './controller.js';

router.get('/getList', getList);
router.post('/postItemToList', postItemToList)
router.put('/putChangeItemOnList', putChangeItemOnList)
router.delete('/deleteItemFromList', deleteItemFromList)

export default router;