import { getFailure, getSuccess, getRequest} from '../index.js';
import { GET_LOGGED_USER, GET_LOGOUT_USER, GET_PERMISSION_LIST } from '../constants/auth';

const initial = { loading: false, data: null, error: null }
const initialState = { 
    auth0: { ...initial },
    permission: { ...initial }
 }

export const authReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch(type) {
        // IS USER LOGGED
        case getRequest(GET_LOGGED_USER): {
            return {
                ...state,
                auth0: { loading: true, data: null, error: null }
            }
        }
        case getSuccess(GET_LOGGED_USER): {
            return {
                ...state,
                auth0: { loading: false, data: payload, error: null }
            }
        }
        case getFailure(GET_LOGGED_USER): {
            return {
                ...state,
                auth0: { loading: false, data: null, error: true }
            }
        }
        // LOG OUT USER
        case getRequest(GET_LOGOUT_USER): {
            return {
                ...state,
                auth0: { ...state.auth0, loading: true}
            }
        }
        case getSuccess(GET_LOGOUT_USER): {    
            localStorage.clear()
            sessionStorage.clear()
            return { ...initialState }
        }
        // GET PERMISSION
        case getRequest(GET_PERMISSION_LIST): {
            return {
                ...state,
                permission: { loading: true, data: null, error: null }
            }
        }
        case getSuccess(GET_PERMISSION_LIST): {
            return {
                ...state,
                permission: { loading: false, data: payload, error: null }
            }
        }
        case getFailure(GET_PERMISSION_LIST): {
            return {
                ...state,
                permission: { loading: false, data: null, error: true }
            }
        }
        default: return state;
    }
}