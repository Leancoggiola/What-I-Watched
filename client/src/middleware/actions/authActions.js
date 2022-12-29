import { getFailure, getSuccess, getRequest} from '../index.js';

import { GET_USER_LOGGED, GET_USER_LOGOUT } from '../constants/auth';

// GET USER LOGGED
export const isUserLoggedInRequest = (payload) => {
    return {
        type: getRequest(GET_USER_LOGGED),
        payload
    }
}

export const isUserLoggedInSuccess = (payload) => {
    return {
        type: getSuccess(GET_USER_LOGGED),
        payload
    }
}

export const isUserLoggedInFailure = (payload) => {
    return {
        type: getFailure(GET_USER_LOGGED),
        payload
    }
}

// GET USER LOGOUT
export const logOutRequest = (payload) => {
    return {
        type: getRequest(GET_USER_LOGOUT),
        payload
    }
}

export const logOutSuccess = (payload) => {
    return {
        type: getSuccess(GET_USER_LOGOUT),
        payload
    }
}

export const logOutFailure = (payload) => {
    return {
        type: getFailure(GET_USER_LOGOUT),
        payload
    }
}