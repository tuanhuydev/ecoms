import { Account } from 'scripts/interfaces/Model';
import { LOADING_STATE } from 'scripts/configs/enums';
import { PayloadAction, createAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { useSelector } from 'react-redux';

const initialState: any = {
  currentAccount: {},
  loading: LOADING_STATE.IDLE
};

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setCurrentAccount(state, action: PayloadAction<Account>) {
      state.currentAccount = action.payload;
    },
    setLoading(state, action: PayloadAction<any>) {
      state.loading = action.payload;
    },
    updateCurrentAccount(state, action: PayloadAction<Partial<Account>>) {
      state.currentAccount = {
        ...state.currentAccount,
        ...action.payload
      };
    }
  }
});

// Actions
const patchAccount = createAction<Partial<Account>>('account/patch');
export const accountActions = {
  ...accountSlice.actions,
  patchAccount
};

// Selectors
export const selectCurrentAccount = () => useSelector((state: RootState) => state.account.currentAccount);

export default accountSlice.reducer;
