import { getFailure, getSuccess, getRequest} from '../index.js';

import { APP_DELETE_APP, APP_GET_APPS_LIST, APP_POST_APP, APP_PUT_APP } from '../constants/metadata.js';

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

// POST NEW APP
export const postNewAppRequest = (payload) => {
    return {
        type: getRequest(APP_POST_APP),
        payload
    }
}

export const postNewAppSuccess = (payload) => {
    return {
        type: getSuccess(APP_POST_APP),
        payload
    }
}

export const postNewAppFailure = (payload) => {
    return {
        type: getFailure(APP_POST_APP),
        payload
    }
}

// UPDATE APP
export const updateAppRequest = (payload) => {
    return {
        type: getRequest(APP_PUT_APP),
        payload
    }
}

export const updateAppSuccess = (payload) => {
    return {
        type: getSuccess(APP_PUT_APP),
        payload
    }
}

export const updateAppFailure = (payload) => {
    return {
        type: getFailure(APP_PUT_APP),
        payload
    }
}

// DELETE APP
export const deleteAppRequest = (payload) => {
    return {
        type: getRequest(APP_DELETE_APP),
        payload
    }
}

export const deleteAppSuccess = (payload) => {
    return {
        type: getSuccess(APP_DELETE_APP),
        payload
    }
}

export const deleteAppFailure = (payload) => {
    return {
        type: getFailure(APP_DELETE_APP),
        payload
    }
}