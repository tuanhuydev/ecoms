import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Meta } from '../interfaces/Meta';

const initialState: Meta = {
  openSidebar: true
};

export const metaSlice = createSlice({
  name: 'meta',
  initialState,
  reducers: {
    setOpenSidebar(state, action: PayloadAction<Meta>) {
      state.openSidebar = action.payload.openSidebar;
    }
  }
});

export const { setOpenSidebar } = metaSlice.actions;

export default metaSlice.reducer;
