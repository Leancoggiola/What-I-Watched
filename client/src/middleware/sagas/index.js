import { all } from 'redux-saga/effects';
import { appsSaga } from './appsSaga';

export default function* rootSagas() {
    yield all([
        ...appsSaga
    ])
}