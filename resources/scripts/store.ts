import { configureStore } from '@reduxjs/toolkit';
import metaSlice from './slices/metaSlice';
import taskSlice from './slices/taskSlice';
import userSlice from './slices/userSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    meta: metaSlice,
    task: taskSlice
  }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
