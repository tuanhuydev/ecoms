import { LOADING_STATE, TASK_STATUS } from '../../configs/enums';
import { PayloadAction, createAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { Task } from '../../interfaces/Task';
import { useSelector } from 'react-redux';

export interface TaskSliceType {
  tasks: Task[];
  loading: string,
}

const initialState: TaskSliceType = {
  tasks: [],
  loading: LOADING_STATE.IDLE
};

export const taskSlice = createSlice({
  name: 'tasks',
  initialState: initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setTasks(state, action) {
      state.tasks = action.payload;
    },
    addTask(state, action: PayloadAction<Task>) {
      state.tasks.unshift(action.payload);
    },
    updateTask(state, action: PayloadAction<Task>) {
      const index = state.tasks.findIndex((task) => task.id === action.payload.id);
      state.tasks[index] = action.payload;
    },
    completeTask(state, action: PayloadAction<string>) {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    }
  }
});

// Actions
const fetchTasks = createAction('task/fetchTasks');
const createTask = createAction<any>('task/createTask');

export const taskActions = { ...taskSlice.actions, fetchTasks, createTask };

// Selector
export const selectTaskLoading = (): string => useSelector((state: RootState) => state.task.loading);
export const selectAllTasks = (): Task[] => useSelector((state: RootState) => state.task.tasks);
export const selectBacklogTasks = (): Task[] => useSelector((state: RootState) =>
  state.task.tasks.filter((task: Task) =>
    task.status === TASK_STATUS.BACKLOG)
);

export default taskSlice.reducer;
