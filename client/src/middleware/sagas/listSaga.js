import { call, put, takeLatest } from 'redux-saga/effects';

import { serviceCall } from '../../config/serviceCall.js';
import {
    getUserListFailure,
    getUserListSuccess,
    postItemToListFailure,
    postItemToListSuccess
} from '../actions/listActions';
import { getRequest } from '../index.js';

import { GET_USER_LIST, POST_ITEM_TO_LIST } from '../constants/list';

// Workers
function* getUserListWork(action) {
    const { payload } = action;
    try {
        const options = {
            url: 'http://localhost:3001/list/getList',
            method: 'GET',
            params: {
                user: payload
            }
        }
        const response = yield call(serviceCall, options)
        yield put(getUserListSuccess(response));
    } catch (e) {
        yield put(getUserListFailure(e));
    }
}

function* postItemToListWork(action) {
    const { payload } = action;
    try {
        const options = {
            url: 'http://localhost:3001/list/postItemToList',
            method: 'POST',
            data: payload
        }
        const response = yield call(serviceCall, options)
        yield put(postItemToListSuccess(response));
    } catch (e) {
        yield put(postItemToListFailure(e));
    }
}

// Watchers
function* getUserListWatch() {
    yield takeLatest(
        getRequest(GET_USER_LIST),
        getUserListWork
    )
}

function* postItemToListWatch() {
    yield takeLatest(
        getRequest(POST_ITEM_TO_LIST),
        postItemToListWork
    )
}

export const listSaga = [
    getUserListWatch(),
    postItemToListWatch()
]