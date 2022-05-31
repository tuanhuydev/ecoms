import { AxiosResponse } from 'axios';
import { LOADING_STATE } from 'scripts/configs/enums';
import { call, put, takeEvery } from 'redux-saga/effects';
import { userActions } from '@store/slices/userSlice';
import UserService from '@services/UserService';

export function * getUsers() {
  try {
    yield put({ type: userActions.setLoading.type, payload: LOADING_STATE.LOADING });
    const { data }: AxiosResponse = yield call(UserService.getUsers);
    if (data.length) {
      yield put({ type: userActions.setUsers.type, payload: data });
    }
    yield put({ type: userActions.setLoading.type, payload: LOADING_STATE.IDLE });
  } catch (error) {
    yield put({ type: userActions.setLoading.type, payload: LOADING_STATE.FAIL });
  }
}

export default function * userSaga() {
  yield takeEvery(userActions.fetchUsers.type, getUsers);
}
