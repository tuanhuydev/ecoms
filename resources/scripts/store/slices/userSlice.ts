import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { User } from '../../interfaces/User';
import { useSelector } from 'react-redux';

const EMPTY_USER = {};

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: EMPTY_USER
  },
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    }
  }
});

export const { setUser } = userSlice.actions;

// selector
export const SelectUser = () => useSelector((state: RootState) => state.user.user);

export default userSlice.reducer;
