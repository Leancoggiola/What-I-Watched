import { put, takeLeading, delay} from 'redux-saga/effects';
import { Auth0TokenProvider } from '../../config/auth';

import { getRequest } from '../index.js';
import { isUserLoggedInFailure, isUserLoggedInSuccess, isUserLoggedInRequest } from '../actions/authActions';

import { GET_USER_LOGGED } from '../constants/auth';


function getCookie(cname) {
    const name = cname + "=";
    const decodedCookie = decodeURIComponent(document.cookie)
    decodedCookie.split(';').forEach(ca => {
        let c = ca;
        while(c.charAt(0) === " ") {
            c = c.substring(1);
        }
        if(c.indexOf(name) === 0) {
            return c.substring(name.length, c.length)
        }
    });
    return "";
}

// Workers
function* isUserLoggedInWork(action) {
    try {
        yield delay(2000);
        const auth0TokenProvider = Auth0TokenProvider();
        const isAuthenticatedCookieSet = getCookie(`auth0.eACG1Ww9RQSOzODzyWu37HR0GalgYGsN.is.authenticated`);
        const loginWithRedirect = action.payload.loginWithRedirect;
        const userDetails = auth0TokenProvider.getUserDetails();
        if(isAuthenticatedCookieSet) {
            if(userDetails) {
                yield put(isUserLoggedInSuccess(userDetails))
                return userDetails;
            } else {
                loginWithRedirect({ appState: { returnTo: window.location.href }})
                return;
            }
        } else if (!isAuthenticatedCookieSet) {
            loginWithRedirect({ appState: { returnTo: window.location.href }})
            return;
        }
    } catch (e) {
        yield put(isUserLoggedInFailure(e));
        return e;
    }
}

function* isUserLoggedInWatch() {
    yield takeLeading(
        getRequest(GET_USER_LOGGED),
        isUserLoggedInWork
    )
}

export const authSaga = [
    isUserLoggedInWatch()
]