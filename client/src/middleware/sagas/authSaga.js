import { put, call, takeLatest, delay} from 'redux-saga/effects';

import { getRequest } from '../index.js';
import { isUserLoggedInSuccess, isUserLoggedInFailure, isUserLoggedInRequest } from '../actions/authActions';

import { GET_LOGGED_USER } from '../constants/auth';

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

// Workers
function* isUserLoggedInWork(action) {
    const { payload: { loginWithRedirect } } = action;
    yield put(isUserLoggedInRequest());
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

export const authSaga = [
    takeLatest(GET_LOGGED_USER, isUserLoggedInWork)
]