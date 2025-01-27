const express = require('express');
const router = express.Router();

const {
    getAppList,
    getStatusList,
    deleteApp,
    deleteStatus,
    postNewApp,
    postNewStatus,
    putChangeApp,
    putChangeStatus
}= require('./controller.js');

router.get('/getAppList', getAppList);
router.get('/getStatusList', getStatusList);
router.delete('/deleteApp', deleteApp);
router.delete('/deleteStatus', deleteStatus);
router.post('/postNewApp', postNewApp);
router.post('/postNewStatus', postNewStatus);
router.put('/putChangeApp', putChangeApp);
router.put('/putChangeStatus', putChangeStatus);

module.exports =  router;