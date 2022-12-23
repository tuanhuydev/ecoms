import { AxiosResponse } from 'axios';
import { LOADING_STATE } from 'scripts/configs/enums';
import { accountActions } from 'scripts/store/slices/accountSlice';
import { call, put, takeEvery } from 'redux-saga/effects';
import AccountService from 'scripts/services/AccountService';

const accountService = new AccountService();

export function * patchAccount(action: any) {
  try {
    yield put({ type: accountActions.setLoading.type, payload: LOADING_STATE.LOADING });
    const { data }: AxiosResponse = yield call(accountService.patchAccount, action.payload);
    if (data.success) {
      if (data.current) {
        yield put({ type: accountActions.updateCurrentAccount.type, payload: action.payload });
      }
      yield put({ type: accountActions.setLoading.type, payload: LOADING_STATE.SUCCESS });
    }
  } catch (error) {
    yield put({ type: accountActions.setLoading.type, payload: LOADING_STATE.FAIL });
  } finally {
    yield put({ type: accountActions.setLoading.type, payload: LOADING_STATE.IDLE });
  }
}

export default function * accountSaga() {
  yield takeEvery(accountActions.patchAccount.type, patchAccount);
}
