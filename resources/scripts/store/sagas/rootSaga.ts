
import { all } from 'redux-saga/effects';
import accountSaga from './accountSaga';
import taskSaga from './taskSaga';
import userSaga from './userSaga';

export default function * rootSaga() {
  yield all([
    taskSaga(),
    userSaga(),
    accountSaga()
  ]);
}
