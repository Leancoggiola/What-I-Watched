import { APP_GET_APPS_LIST, STATUS_GET_STATUS_LIST } from '../constants/metadata.js';
import { getFailure, getRequest, getSuccess } from '../index.js';

const initial = { loading: false, data: null, error: null };

const initialState = {
    appList: {...initial},
    statusList: {...initial}
}

export const metaReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch(type) {
        // GET APPs LIST
        case getRequest(APP_GET_APPS_LIST): {
            return {
                ...state,
                appList: { loading: true, data: null, error: null }
            }
        }
        case getSuccess(APP_GET_APPS_LIST): {
            return {
                ...state,
                appList: { loading: false, data: payload, error: null }
            }
        }
        case getFailure(APP_GET_APPS_LIST): {
            return {
                ...state,
                appList: { loading: true, data: null, error: payload }
            }
        }
        // GET Status LIST
        case getRequest(STATUS_GET_STATUS_LIST): {
            return {
                ...state,
                statusList: { loading: true, data: null, error: null }
            }
        }
        case getSuccess(STATUS_GET_STATUS_LIST): {
            return {
                ...state,
                statusList: { loading: false, data: payload, error: null }
            }
        }
        case getFailure(STATUS_GET_STATUS_LIST): {
            return {
                ...state,
                statusList: { loading: true, data: null, error: payload }
            }
        }
        default: return state;
    }
}