import { getFailure, getSuccess, getRequest} from '../index.js';
import { GET_CONTENT_SEARCH } from '../constants/search';

const initialState = { loading: false, data: null, error: null }

export const searchReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch(type) {
        // GET APPs LIST
        case getRequest(GET_CONTENT_SEARCH): {
            return { ...state,loading: true, data: null, error: null }
        }
        case getSuccess(GET_CONTENT_SEARCH): {
            return { ...state,loading: false, data: payload, error: null }
        }
        case getFailure(GET_CONTENT_SEARCH): {
            return { ...state,loading: false, data: null, error: payload }
        }
        default: return state;
    }
}