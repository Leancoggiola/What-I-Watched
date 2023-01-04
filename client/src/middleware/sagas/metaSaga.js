import { call, put, takeLatest } from 'redux-saga/effects';

import { serviceCall } from '../../config/serviceCall.js';
import {
    getAppsFailure,
    getAppsSuccess,
    getStatusFailure,
    getStatusSuccess
} from '../actions/metaActions';
import { getRequest } from '../index.js';

import { APP_GET_APPS_LIST, STATUS_GET_STATUS_LIST } from '../constants/metadata';

// Workers
function* getAppsWork() {
    try {
        const options = {
            url: 'http://localhost:3001/meta/getAppList',
            method: 'GET'
        }
        const response = yield call(serviceCall, options)
        yield put(getAppsSuccess(response));
    } catch (e) {
        yield put(getAppsFailure(e));
    }
}

function* getStatusWork() {
    try {
        const options = {
            url: 'http://localhost:3001/meta/getStatusList',
            method: 'GET'
        }
        const response = yield call(serviceCall, options)
        yield put(getStatusSuccess(response));
    } catch (e) {
        yield put(getStatusFailure(e));
    }
}

// Watchers
function* getAppsWatch() {
    yield takeLatest(
        getRequest(APP_GET_APPS_LIST),
        getAppsWork
    )
}

function* getStatusWatch() {
    yield takeLatest(
        getRequest(STATUS_GET_STATUS_LIST),
        getStatusWork
    )
}

export const metaSaga = [
    getAppsWatch(),
    getStatusWatch()
]