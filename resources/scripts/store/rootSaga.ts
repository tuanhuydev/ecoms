
import { all } from 'redux-saga/effects';
import taskSaga from './sagas/taskSaga';

export default function * rootSaga() {
  yield all([
    taskSaga()
  ]);
}
