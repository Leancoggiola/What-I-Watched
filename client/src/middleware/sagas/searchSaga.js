import { put, call, takeLatest} from 'redux-saga/effects';

import { getRequest } from '../index.js';
import { getContentSearchFailure, getContentSearchSuccess } from '../actions/searchActions';
import { serviceCall } from '../../config/serviceCall.js'

import { GET_CONTENT_SEARCH } from '../constants/search';

// Workers
function* getContentSearchWork(action) {
    const { payload } = action;
    try {
        const options = {
            url: 'http://localhost:3001/imdb/getContent',
            method: 'GET',
            params: {
                title: payload
            }
        }
        const response = yield call(serviceCall, options)
        yield put(getContentSearchSuccess(response));
    } catch (e) {
        yield put(getContentSearchFailure(e));
    }
}

// Watchers
function* getContentSearchWatch() {
    yield takeLatest(
        getRequest(GET_CONTENT_SEARCH),
        getContentSearchWork
    )
}

export const searchSaga = [
    getContentSearchWatch()
]