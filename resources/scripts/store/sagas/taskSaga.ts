import { AxiosResponse } from 'axios';
import { DefaultObjectType } from '../../interfaces/Meta';
import { call, put, takeEvery } from 'redux-saga/effects';
import { snakeToCamel } from '../../utils/helpers';
import { taskActions } from '../slices/taskSlice';
import TaskService from '../../services/TaskService';

export function * getTasks() {
  try {
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
  } catch (error) {
    throw new Error('Unable to fetch tasks');
  }
}

export default function * taskSaga() {
  yield takeEvery(taskActions.fetchTasks.type, getTasks);
}
