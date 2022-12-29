import { put, call, takeLatest} from 'redux-saga/effects';

import { getRequest } from '../index.js';
import {
    getAppsFailure,
    getAppsSuccess,
    postNewAppFailure,
    postNewAppSuccess,
    updateAppFailure,
    updateAppSuccess,
    deleteAppFailure,
    deleteAppSuccess
} from '../actions/appsActions.js';
import { serviceCall } from '../../config/serviceCall.js'

import { APP_GET_APPS_LIST } from '../constants/metadata';

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

// Watchers
function* getAppsWatch() {
    yield takeLatest(
        getRequest(APP_GET_APPS_LIST),
        getAppsWork
    )
}

export const appsSaga = [
    getAppsWatch()
]