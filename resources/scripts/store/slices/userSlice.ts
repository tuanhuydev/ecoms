import { EMPTY_ARRAY, EMPTY_USER } from 'scripts/configs/constants';
import { LOADING_STATE } from 'scripts/configs/enums';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { User } from '../../interfaces/User';
import { useSelector } from 'react-redux';

export interface UserSliceType {
  users: User[];
  currentUser?: User;
  loading: string,
}

const initialState: UserSliceType = {
  users: EMPTY_ARRAY,
  currentUser: EMPTY_USER,
  loading: LOADING_STATE.IDLE
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    fetchUsers() {},
    setLoading(state: any, action: PayloadAction<LOADING_STATE>) {
      state.loading = action.payload;
    },
    setCurrentUser(state: any, action: PayloadAction<User>) {
      state.currentUser = action.payload;
    },
    setUsers(state: any, action: PayloadAction<User[]>) {
      state.users = action.payload;
    }
  }
});

// Actions
export const userActions = userSlice.actions;

// selector
export const selectCurrentUser = () => useSelector((state: RootState) => state.user.currentUser);
export const selectUsers = () => useSelector((state: RootState) => state.user.users);
export const selectLoadingUser = () => useSelector((state: RootState) => state.user.loading);

export default userSlice.reducer;
