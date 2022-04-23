import { AxiosResponse } from 'axios';
import { DefaultObjectType } from '../../interfaces/Meta';
import { LOADING_STATE } from '../../configs/enums';
import { call, put, takeEvery } from 'redux-saga/effects';
import { snakeToCamel } from '../../utils/helpers';
import { taskActions } from '../slices/taskSlice';
import TaskService from '../../services/TaskService';

export function * getTasks() {
  try {
    yield put({ type: taskActions.setLoading.type, payload: LOADING_STATE.LOADING });
    const { data }: AxiosResponse = yield call(TaskService.getTasks);
    // Format Data
    const tasks = data?.tasks.map((task: any) => {
      const newTask: DefaultObjectType = {};
      Object.keys(task).forEach((key: string) => {
        newTask[snakeToCamel(key)] = task[key];
      });
      return newTask;
    });
    yield put({ type: taskActions.setTasks.type, payload: tasks });
    yield put({ type: taskActions.setLoading.type, payload: LOADING_STATE.SUCCESS });
  } catch (error) {
    yield put({ type: taskActions.setLoading.type, payload: LOADING_STATE.FAIL });
  }
}

export default function * taskSaga() {
  // yield takeLatest() Fetch Meta data
  yield takeEvery(taskActions.fetchTasks.type, getTasks);
  // yield takeEvery()
}
