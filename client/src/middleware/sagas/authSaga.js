import { delay, put, takeLatest } from 'redux-saga/effects';

import { isUserLoggedInFailure, isUserLoggedInSuccess } from '../actions/authActions';
import { getRequest } from '../index.js';

import { GET_LOGGED_USER } from '../constants/auth';

const getCookie = (cname) => {
    const name = cname + '=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';')
    for(let i=0; i < ca.length; i++) {
        let c = ca[i];
        while(c.charAt(0) === ' ') {
            c = c.substring(1)
        }
        if(c.indexOf(name) === 0) {
            return c.substring(name.length, c.length)
        }
    }
    return '';
}

const getUserDetails = () => {
    let data = '';
    try {
        data = JSON.parse(localStorage.getItem('@@auth0spajs@@::' + process.env.REACT_APP_AUTH0_CLIENT_ID + '::default::openid profile email'))
    } catch (e) {
        return data;
    }
    return data?.body?.decodedToken?.user?.email ? data.body.decodedToken.user.email : '';
}

// Workers
function* isUserLoggedInWork(action) {
    const { payload: { loginWithRedirect } } = action;
    try {
        yield delay(2000)
        const isAuthenticatedCookieSet = getCookie(`auth0.${process.env.REACT_APP_AUTH0_CLIENT_ID}.is.authenticated`);
        if(isAuthenticatedCookieSet) {
            let userEmail = '';
            while(userEmail === '') {
                yield delay(500)
                userEmail = getUserDetails()
            }
            yield put(isUserLoggedInSuccess(userEmail));
        } else {
            loginWithRedirect();
        }
    } catch (e) {
        yield put(isUserLoggedInFailure(e));
    }
}

// Watchers
function* isUserLoggedInWatch() {
    yield takeLatest(
        getRequest(GET_LOGGED_USER),
        isUserLoggedInWork
    )
}

export const authSaga = [
    isUserLoggedInWatch()
]