import { all } from 'redux-saga/effects';
import { appsSaga } from './appsSaga';
import { authSaga } from './authSaga';
import { searchSaga } from './searchSaga';

export default function* rootSagas() {
    yield all([
        ...appsSaga,
        ...authSaga,
        ...searchSaga
    ])
}