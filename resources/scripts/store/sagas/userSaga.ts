import { AxiosResponse } from 'axios';
import { IS_DEV_ENV } from 'scripts/configs/constants';
import { LOADING_STATE } from 'scripts/configs/enums';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { userActions } from 'scripts/store/slices/userSlice';
import UserService from 'scripts/services/UserService';

const userService = new UserService();
const LOADING_IDLE = userActions.setLoading(LOADING_STATE.IDLE);
const LOADING_SUCCESS = userActions.setLoading(LOADING_STATE.SUCCESS);
const LOADING_FAIL = userActions.setLoading(LOADING_STATE.FAIL);

export function * getUsers() {
  try {
    yield put({ type: userActions.setLoading.type, payload: LOADING_STATE.LOADING });
    const { data }: AxiosResponse = yield call(userService.getUsers);
    if (data.length) {
      yield put({ type: userActions.setUsers.type, payload: data });
    }
    yield put(LOADING_IDLE);
  } catch (error) {
    // eslint-disable-next-line no-console
    if (IS_DEV_ENV) console.log(error);
    yield put(LOADING_FAIL);
  }
}

export function * patchUser(action: any) {
  try {
    const { data }: AxiosResponse = yield call(userService.updateUser, action.payload);
    if (data.success) {
      yield put({ type: userActions.updateUser.type, payload: action.payload });
      yield put(LOADING_SUCCESS);
    } else {
      yield put(LOADING_FAIL);
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    if (IS_DEV_ENV) console.log(error);
    yield put(LOADING_FAIL);
  } finally {
    yield put(LOADING_IDLE);
  }
}

export function * postUser(action: any) {
  try {
    const { data }: AxiosResponse = yield call(userService.saveUser, action.payload);
    if (data?.id) {
      yield put({ type: userActions.addUser.type, payload: { ...action.payload, userId: data.id } });
      yield put(LOADING_SUCCESS);
    } else {
      yield put(LOADING_FAIL);
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    if (IS_DEV_ENV) console.log(error);
    yield put(LOADING_FAIL);
  } finally {
    yield put(LOADING_IDLE);
  }
}

export default function * userSaga() {
  yield takeEvery(userActions.fetchUsers.type, getUsers);
  yield takeEvery(userActions.patchUser.type, patchUser);
  yield takeLatest(userActions.postUser.type, postUser);
}
