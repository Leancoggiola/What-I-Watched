const express = require('express');
const router = express.Router();

const { getList, postItemToList, putChangeItemOnList, deleteItemFromList } = require('./controller.js');

router.get('/getList', getList);
router.post('/postItemToList', postItemToList)
router.put('/putChangeItemOnList', putChangeItemOnList)
router.delete('/deleteItemFromList', deleteItemFromList)

module.exports = router;