import { AxiosResponse } from 'axios';
import { LOADING_STATE } from 'scripts/configs/enums';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { userActions } from '@store/slices/userSlice';
import UserService from '@services/UserService';

const userService = new UserService();
export function * getUsers() {
  try {
    yield put({ type: userActions.setLoading.type, payload: LOADING_STATE.LOADING });
    const { data }: AxiosResponse = yield call(userService.getUsers);
    if (data.length) {
      yield put({ type: userActions.setUsers.type, payload: data });
    }
    yield put({ type: userActions.setLoading.type, payload: LOADING_STATE.IDLE });
  } catch (error) {
    console.log(error);
    yield put({ type: userActions.setLoading.type, payload: LOADING_STATE.FAIL });
  }
}

export function * patchUser(action: any) {
  try {
    yield put({ type: userActions.setLoading.type, payload: LOADING_STATE.LOADING });
    const { data }: AxiosResponse = yield call(userService.updateUser, action.payload);
    if (data.success === '1') {
      yield put({ type: userActions.updateUser.type, payload: action.payload });
      yield put({ type: userActions.setLoading.type, payload: LOADING_STATE.SUCCESS });
    } else {
      yield put({ type: userActions.setLoading.type, payload: LOADING_STATE.FAIL });
    }
  } catch (error) {
    yield put({ type: userActions.setLoading.type, payload: LOADING_STATE.FAIL });
  } finally {
    yield put({ type: userActions.setLoading.type, payload: LOADING_STATE.IDLE });
  }
}

export function * saveUser(action: any) {
  try {
    yield put({ type: userActions.setLoading.type, payload: LOADING_STATE.LOADING });
    const { data }: AxiosResponse = yield call(userService.saveUser, action.payload);
    if (data?.id) {
      yield put({ type: userActions.addUser.type, payload: { ...action.payload, userId: data.id } });
      yield put({ type: userActions.setLoading.type, payload: LOADING_STATE.SUCCESS });
    } else {
      yield put({ type: userActions.setLoading.type, payload: LOADING_STATE.FAIL });
    }
  } catch (error) {
    yield put({ type: userActions.setLoading.type, payload: LOADING_STATE.FAIL });
  } finally {
    yield put({ type: userActions.setLoading.type, payload: LOADING_STATE.IDLE });
  }
}

export default function * userSaga() {
  yield takeEvery(userActions.fetchUsers.type, getUsers);
  yield takeEvery(userActions.patchUser.type, patchUser);
  yield takeLatest(userActions.saveUser.type, saveUser);
}
