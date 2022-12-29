import { getFailure, getSuccess, getRequest} from '../index.js';
import { GET_USER_LOGGED, GET_USER_LOGOUT } from '../constants/auth';

const initialState = { 
    loading: false, 
    data: null, 
    error: null 
}

export const authReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch(type) {
        // GET USER LOGGED
        case getRequest(GET_USER_LOGGED): {
            return { ...state, loading: true, data: null, error: null }
        }
        case getSuccess(GET_USER_LOGGED): {
            return { ...state, loading: false, data: payload, error: null }
        }
        case getFailure(GET_USER_LOGGED): {
            return { ...state, loading: false, data: null, error: true }
        }
        // GET USER LOGOUT
        case getRequest(GET_USER_LOGOUT): {
            return { ...state, loading: true}
        }
        case getSuccess(GET_USER_LOGOUT): {
            return { ...state, loading: false, data: null, error: null }
        }
        case getFailure(GET_USER_LOGOUT): {
            return { ...state, loading: false, data: null, error: true }
        }
        default: return state;
    }
}