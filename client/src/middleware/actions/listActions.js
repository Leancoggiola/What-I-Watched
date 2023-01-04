import { getFailure, getRequest, getSuccess } from '../index.js';

import { GET_USER_LIST, POST_ITEM_TO_LIST } from '../constants/list';

// GET User List
export const getUserListRequest = (payload) => {
    return {
        type: getRequest(GET_USER_LIST),
        payload
    }
}

export const getUserListSuccess = (payload) => {
    return {
        type: getSuccess(GET_USER_LIST),
        payload
    }
}

export const getUserListFailure = (payload) => {
    return {
        type: getFailure(GET_USER_LIST),
        payload
    }
}

// Post Item to List
export const postItemToListRequest = (payload) => {
    return {
        type: getRequest(POST_ITEM_TO_LIST),
        payload
    }
}

export const postItemToListSuccess = (payload) => {
    return {
        type: getSuccess(POST_ITEM_TO_LIST),
        payload
    }
}

export const postItemToListFailure = (payload) => {
    return {
        type: getFailure(POST_ITEM_TO_LIST),
        payload
    }
}