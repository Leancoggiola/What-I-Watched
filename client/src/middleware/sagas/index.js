import { all } from 'redux-saga/effects';
import { appsSaga } from './appsSaga';
import { authSaga } from './authSaga'

export default function* rootSagas() {
    yield all([
        ...appsSaga,
        ...authSaga
    ])
}