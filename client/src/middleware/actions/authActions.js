import { getFailure, getSuccess, getRequest} from '../index.js';

import { GET_LOGGED_USER, GET_LOGOUT_USER, GET_PERMISSION_LIST } from '../constants/auth';

// IS USER LOGGED
export const isUserLoggedInRequest = (payload) => {
    return {
        type: getRequest(GET_LOGGED_USER),
        payload
    }
}

export const isUserLoggedInSuccess = (payload) => {
    return {
        type: getSuccess(GET_LOGGED_USER),
        payload
    }
}

export const isUserLoggedInFailure = (payload) => {
    return {
        type: getFailure(GET_LOGGED_USER),
        payload
    }
}

// LOG OUT USER
export const logOutUserRequest = (payload) => {
    return {
        type: getRequest(GET_LOGOUT_USER),
        payload
    }
}

export const logOutUserSuccess = (payload) => {
    return {
        type: getSuccess(GET_LOGOUT_USER),
        payload
    }
}

export const logOutUserFailure = (payload) => {
    return {
        type: getFailure(GET_LOGOUT_USER),
        payload
    }
}

// GET PERMISSIONS
export const getPermissionRequest = (payload) => {
    return {
        type: getRequest(GET_PERMISSION_LIST),
        payload
    }
}

export const getPermissionSuccess = (payload) => {
    return {
        type: getSuccess(GET_PERMISSION_LIST),
        payload
    }
}

export const getPermissionFailure = (payload) => {
    return {
        type: getFailure(GET_PERMISSION_LIST),
        payload
    }
}