import { DefaultObjectType } from 'scripts/interfaces/Meta';
import { LOADING_STATE, TASK_STATUS } from '../../configs/enums';
import { PayloadAction, createAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { Task } from '../../interfaces/Task';
import { useSelector } from 'react-redux';
import cloneDeep from 'lodash/cloneDeep';

export interface TaskFilter {
  search?: string;
  status?: string;
  severity?: string;
}

export interface TaskSliceType {
  tasks: Task[];
  loading: string;
  filter: TaskFilter;
}

const initialState: TaskSliceType = {
  tasks: [],
  loading: LOADING_STATE.IDLE,
  filter: {}
};

export const taskSlice = createSlice({
  name: 'tasks',
  initialState: initialState,
  reducers: {
    fetchTasks() {},
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setTasks(state, action) {
      state.tasks = action.payload;
    },
    addTask(state, action: PayloadAction<Task>) {
      state.tasks.unshift(action.payload);
    },
    removeTask(state, action: PayloadAction<number>) {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    updateTask(state, action: PayloadAction<Task>) {
      const index = state.tasks.findIndex((task) => task.id === action.payload.id);
      state.tasks[index] = action.payload;
    },
    completeTask(state, action: PayloadAction<number>) {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    setTaskFilter(state, { payload }: PayloadAction<DefaultObjectType>) {
      state.filter = payload;
    }
  }
});

// Actions
const deleteTask = createAction<number>('task/delete');
const createTask = createAction<any>('task/create');

export const taskActions = {
  ...taskSlice.actions,
  deleteTask,
  createTask
};

// Selector
export const selectTaskLoading = (): string => useSelector((state: RootState) => state.task.loading);
export const selectAllTasks = (): Task[] => useSelector((state: RootState) => state.task.tasks);
export const selectBacklogTasks = (): Task[] => useSelector((state: RootState) =>
  state.task.tasks.filter((task: Task) =>
    task.status === TASK_STATUS.BACKLOG)
);

export const selectTaskFilter = (): DefaultObjectType => useSelector((state: RootState) => state.task.filter);

export const selectFilteredTasks = (): Task[] => useSelector(({ task: slice }: RootState) => {
  const { tasks, filter } = slice;
  let filteredTasks = cloneDeep(tasks);

  if (filter?.status) {
    filteredTasks = filteredTasks.filter((task) => task.status === filter.status);
  }

  if (filter?.severity) {
    filteredTasks = filteredTasks.filter((task) => task.severity === filter.severity);
  }

  if (filter?.search) {
    filteredTasks = filteredTasks.filter((task) => {
      const taskTitle = task.title.toLowerCase().trim();
      return taskTitle.includes(filter.search);
    });
  }

  return filteredTasks;
});

export default taskSlice.reducer;
