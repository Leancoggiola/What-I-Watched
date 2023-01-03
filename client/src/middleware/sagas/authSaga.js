import { put, call, takeLatest, delay} from 'redux-saga/effects';

import { getRequest } from '../index.js';
import { isUserLoggedInSuccess, isUserLoggedInFailure, getPermissionFailure, getPermissionSuccess } from '../actions/authActions';

import { GET_LOGGED_USER, GET_PERMISSION_LIST } from '../constants/auth';

const getCookie = (cname) => {
    const name = cname + '=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';')
    for(let i=0; i < ca.length; i++) {
        let c = ca[i];
        while(c.charAt(0)== ' ') {
            c = c.substring(1)
        }
        if(c.indexOf(name) == 0) {
            return c.substring(name.length, c.length)
        }
    }
    return '';
}

const getUserDetails = () => {
    let data = '';
    try {
        data = JSON.parse(localStorage.getItem('@@auth0spajs@@::' + 'eACG1Ww9RQSOzODzyWu37HR0GalgYGsN' + '::default::openid profile email'))
    } catch (e) {
        throw new Error(e)
    }
    return data?.body?.decodedToken?.user?.email ? data.body.decodedToken.user.email : '';
}

// Workers
function* isUserLoggedInWork(action) {
    const { payload: { loginWithRedirect } } = action;
    try {
        yield delay(2000)
        const isAuthenticatedCookieSet = getCookie(`auth0.eACG1Ww9RQSOzODzyWu37HR0GalgYGsN.is.authenticated`);
        if(isAuthenticatedCookieSet) {
            yield put(isUserLoggedInSuccess(true));
        } else {
            loginWithRedirect({ appState: { returnTo: window.location.href }});
        }
    } catch (e) {
        yield put(isUserLoggedInFailure(e));
    }
}

function* getPermissionListWork() {
    try {
        const options = {
            url: 'http://localhost:3001/auth/getPermissionList',
            method: 'GET',
            params: {
                user: getUserDetails(),
            }
        }
        const response = yield call(serviceCall, options)
        yield put(getPermissionSuccess(response));
    } catch (e) {
        yield put(getPermissionFailure(e));
    }
}

// Watchers
function* isUserLoggedInWatch() {
    yield takeLatest(
        getRequest(GET_LOGGED_USER),
        isUserLoggedInWork
    )
}

function* getPermissionListWatch() {
    yield takeLatest(
        getRequest(GET_PERMISSION_LIST),
        getPermissionListWork
    )
}

export const authSaga = [
    isUserLoggedInWatch(),
    getPermissionListWatch()
]