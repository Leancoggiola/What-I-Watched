import { getFailure, getSuccess, getRequest} from '../index.js';
import { APP_DELETE_APP, APP_GET_APPS_LIST, APP_POST_APP, APP_PUT_APP } from '../constants/metadata.js';

const initial = { loading: false, data: null, error: null };

const initialState = {
    list: {...initial},
    crud: {...initial}
}

export const appsReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch(type) {
        // GET APPs LIST
        case getRequest(APP_GET_APPS_LIST): {
            return {
                ...state,
                list: { loading: true, data: null, error: null }
            }
        }
        case getSuccess(APP_GET_APPS_LIST): {
            return {
                ...state,
                list: { loading: false, data: payload, error: null }
            }
        }
        case getFailure(APP_GET_APPS_LIST): {
            return {
                ...state,
                list: { loading: true, data: null, error: payload }
            }
        }
        // POST NEW APP
        case getRequest(APP_POST_APP): {
            return {
                ...state,
                crud: { loading: true, data: null, error: null }
            }
        }
        case getSuccess(APP_POST_APP): {
            return {
                ...state,
                crud: { loading: false, data: payload, error: null }
            }
        }
        case getFailure(APP_POST_APP): {
            return {
                ...state,
                crud: { loading: true, data: null, error: payload }
            }
        }
        // UPDATE APP
        case getRequest(APP_PUT_APP): {
            return {
                ...state,
                crud: { loading: true, data: null, error: null }
            }
        }
        case getSuccess(APP_PUT_APP): {
            return {
                ...state,
                crud: { loading: false, data: payload, error: null }
            }
        }
        case getFailure(APP_PUT_APP): {
            return {
                ...state,
                crud: { loading: true, data: null, error: payload }
            }
        }
        // DELETE APP
        case getRequest(APP_DELETE_APP): {
            return {
                ...state,
                crud: { loading: true, data: null, error: null }
            }
        }
        case getSuccess(APP_DELETE_APP): {
            return {
                ...state,
                crud: { loading: false, data: payload, error: null }
            }
        }
        case getFailure(APP_DELETE_APP): {
            return {
                ...state,
                crud: { loading: true, data: null, error: payload }
            }
        }
        default: return state;
    }
}