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
    setCurrentUser(state, action: PayloadAction<User>) {
      state.currentUser = action.payload;
    }
  }
});

export const { setCurrentUser } = userSlice.actions;

// selector
export const SelectCurrentUser = () => useSelector((state: RootState) => state.user.currentUser);

export default userSlice.reducer;
