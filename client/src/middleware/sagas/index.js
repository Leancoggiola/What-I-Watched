import { all } from 'redux-saga/effects';
import { authSaga } from './authSaga';
import { metaSaga } from './metaSaga';
import { searchSaga } from './searchSaga';
import { listSaga } from './listSaga';

export default function* rootSagas() {
    yield all([
        ...metaSaga,
        ...authSaga,
        ...searchSaga,
        ...listSaga
    ])
}