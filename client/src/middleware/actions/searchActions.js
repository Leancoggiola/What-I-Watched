import { getFailure, getSuccess, getRequest} from '../index.js';

import { GET_CONTENT_SEARCH } from '../constants/search';

// GET APPs LIST
export const getContentSearchRequest = (payload) => {
    return {
        type: getRequest(GET_CONTENT_SEARCH),
        payload
    }
}

export const getContentSearchSuccess = (payload) => {
    return {
        type: getSuccess(GET_CONTENT_SEARCH),
        payload
    }
}

export const getContentSearchFailure = (payload) => {
    return {
        type: getFailure(GET_CONTENT_SEARCH),
        payload
    }
}