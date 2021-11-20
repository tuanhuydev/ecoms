import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '../interfaces/Task';

const initialState: Task[] = [];

export const taskSlice = createSlice({
  name: 'tasks',
  initialState: initialState,
  reducers: {
    addTask(state, action: PayloadAction<Task>) {
      state.unshift(action.payload);
    },
    completeTask(state, action: PayloadAction<string>) {
      return state.filter((task) => task.id !== action.payload);
    }
  }
});

export const { addTask, completeTask } = taskSlice.actions;

export default taskSlice.reducer;
