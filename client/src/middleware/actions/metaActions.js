import { getFailure, getSuccess, getRequest} from '../index.js';

import { APP_GET_APPS_LIST, STATUS_GET_STATUS_LIST } from '../constants/metadata.js';

// GET APPs LIST
export const getAppsRequest = (payload) => {
    return {
        type: getRequest(APP_GET_APPS_LIST),
        payload
    }
}

export const getAppsSuccess = (payload) => {
    return {
        type: getSuccess(APP_GET_APPS_LIST),
        payload
    }
}

export const getAppsFailure = (payload) => {
    return {
        type: getFailure(APP_GET_APPS_LIST),
        payload
    }
}

// GET Status LIST
export const getStatusRequest = (payload) => {
    return {
        type: getRequest(STATUS_GET_STATUS_LIST),
        payload
    }
}

export const getStatusSuccess = (payload) => {
    return {
        type: getSuccess(STATUS_GET_STATUS_LIST),
        payload
    }
}

export const getStatusFailure = (payload) => {
    return {
        type: getFailure(STATUS_GET_STATUS_LIST),
        payload
    }
}