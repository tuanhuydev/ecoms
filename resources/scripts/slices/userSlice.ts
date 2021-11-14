import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../interfaces/User';

const EMPTY_USER = {};

export const userSlice = createSlice({
  name: 'user',
  initialState: EMPTY_USER,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state = action.payload;
    }
  }
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
