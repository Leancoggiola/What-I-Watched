const express = require('express');
const router = express.Router();

const { getContent, getOverviewDetails } = require('./controller.js');

router.get('/getContent', getContent)
router.get('/getOverviewDetails', getOverviewDetails)

module.exports = router;