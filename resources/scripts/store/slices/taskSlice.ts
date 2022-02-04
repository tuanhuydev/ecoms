import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { TASK_STATUS } from '../../configs/constants';
import { Task } from '../../interfaces/Task';
import { useSelector } from 'react-redux';

export interface TaskSliceType {
  tasks: Task[];
  loading: boolean,
}

const initialState: TaskSliceType = {
  tasks: [],
  loading: false
};

export const taskSlice = createSlice({
  name: 'tasks',
  initialState: initialState,
  reducers: {
    fetchTasks() {},
    setTasks(state, action) {
      state.tasks = action.payload;
    },
    addTask(state, action: PayloadAction<Task>) {
      state.tasks.unshift(action.payload);
    },
    updateTask(state, action: PayloadAction<Task>) {
      const index = state.tasks.findIndex((task) => task.taskId === action.payload.taskId);
      state.tasks[index] = action.payload;
    },
    completeTask(state, action: PayloadAction<string>) {
      state.tasks = state.tasks.filter((task) => task.taskId !== action.payload);
    }
  }
});

// Actions
export const taskActions = taskSlice.actions;

// Selector
export const selectAllTasks = (): Task[] => useSelector((state: RootState) => state.task.tasks);
export const selectBacklogTasks = (): Task[] => useSelector((state: RootState) =>
  state.task.tasks.filter((task: Task) =>
    task.status === TASK_STATUS.BACKLOG)
);

export default taskSlice.reducer;
