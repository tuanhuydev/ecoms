import { DefaultObjectType, RootState, Task } from '@utils/interfaces';
import { LOADING_STATE, SORT_TYPE } from '../../configs/enums';
import { PayloadAction, createAction, createSlice, current } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

export interface TaskFilter {
  search?: string;
  status?: string;
  severity?: string;
}

export interface TaskSorter {
  field: string;
  value: SORT_TYPE;
}

export interface TaskPaginator {
  total?: number;
  hasMorePage?: boolean;
  currentPage?: number;
  lastPage?: number;
  perPage?: number;
}

export interface TaskParams {
  filter?: TaskFilter;
  sorter?: TaskSorter;
  paginator?: TaskPaginator;
}

export interface TaskSliceType {
  tasks: Task[];
  loading: string;
  params: TaskParams;
}

export const initialState: TaskSliceType = {
  tasks: [],
  loading: LOADING_STATE.IDLE,
  params: {
    sorter: {
      field: 'createdAt',
      value: SORT_TYPE.DESCENDING
    },
    paginator: {
      total: 0,
      hasMorePage: false,
      currentPage: 1,
      lastPage: 1,
      perPage: 20
    }
  }
};

export const taskSlice = createSlice({
  name: 'tasks',
  initialState: initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setTasks(state, { payload }) {
      const currentTaskIds = current(state.tasks).map((currentTask: Task) => currentTask.id);
      if (payload?.length) {
        payload.forEach((task: Task) => {
          if (!currentTaskIds.includes(task.id)) {
            state.tasks.push(task);
          }
        });
      }
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
    setTaskParams(state, { payload }: PayloadAction<TaskParams>) {
      if (payload.filter || payload.sorter) {
        state.tasks = [];
        state.params.paginator = initialState.params.paginator;
      }
      state.params = { ...current(state.params), ...payload };
      return state;
    }
  }
});

// Actions

const fetchTasks = createAction<DefaultObjectType>('task/fetch');
const deleteTask = createAction<number>('task/delete');
const createTask = createAction<any>('task/create');
const saveTask = createAction<any>('task/save');

export const taskActions = {
  ...taskSlice.actions,
  fetchTasks,
  deleteTask,
  createTask,
  saveTask
};

// Selector
export const selectTaskLoading = (): string => useSelector((state: RootState) => state.task.loading);

export const selectAllTasks = (): Task[] => useSelector((state: RootState) => state.task.tasks);

export const selectTaskById = (id: number) =>
  useSelector((state: RootState) => {
    return state.task.tasks.find((task: Task) => task.id === id);
  });

export const selectTaskParams = (): TaskParams => useSelector((state: RootState) => state.task.params);
export const selectTaskFilter = (): TaskFilter => useSelector((state: RootState) => state.task.params.filter);
export const selectTaskSorter = (): TaskSorter => useSelector((state: RootState) => state.task.params.sorter);
export const selectTaskPaginator = (): TaskPaginator => useSelector((state: RootState) => state.task.params.paginator);

export default taskSlice.reducer;
