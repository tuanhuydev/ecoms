import { AxiosResponse } from 'axios';
import { LOADING_STATE } from '../../configs/enums';
import { call, put, takeLatest } from 'redux-saga/effects';
import { taskActions } from '../slices/taskSlice';
import TaskService from '../../services/TaskService';

const taskService = new TaskService();
const LOADING_IDLE = taskActions.setLoading(LOADING_STATE.IDLE);
const LOADING_SUCCESS = taskActions.setLoading(LOADING_STATE.SUCCESS);
const LOADING_FAIL = taskActions.setLoading(LOADING_STATE.SUCCESS);
const LOADING = taskActions.setLoading(LOADING_STATE.LOADING);

export function * getTasks(action: any) {
  try {
    yield put(LOADING);
    const { data }: AxiosResponse = yield call(taskService.getTasks, action.payload);
    yield put(taskActions.setTasks(data.tasks));
    yield put(taskActions.setTaskParams({ paginator: data.pagination }));
    yield put(LOADING_SUCCESS);
  } catch (error) {
    yield put(LOADING_FAIL);
  } finally {
    yield put(LOADING_IDLE);
  }
}

export function * createTask(action: any) {
  try {
    yield put(taskActions.setLoading(LOADING_STATE.LOADING));
    const { data }: AxiosResponse = yield call(taskService.createTask, action.payload);
    if (data?.id) {
      const newTask = {
        ...action.payload,
        id: data?.id
      };
      yield put(taskActions.addTask(newTask));
      yield put(LOADING_SUCCESS);
    }
  } catch (error) {
    yield put(LOADING_FAIL);
  } finally {
    yield put(LOADING_IDLE);
  }
}

export function * deleteTask(action: any) {
  try {
    yield put(taskActions.setLoading(LOADING_STATE.LOADING));
    const { data }: AxiosResponse = yield call(taskService.deleteTask, action.payload);
    if (data.success) {
      yield put({ type: taskActions.removeTask.type, payload: action.payload });
      yield put(LOADING_SUCCESS);
    }
  } catch (error) {
    yield put(LOADING_FAIL);
  } finally {
    yield put(LOADING_IDLE);
  }
}

export function * saveTask(action: any) {
  try {
    yield put(taskActions.setLoading(LOADING_STATE.LOADING));
    const { data }: AxiosResponse = yield call(taskService.updateTask, action.payload);
    if (data.success) {
      yield put(taskActions.updateTask(action.payload));
      yield put(LOADING_SUCCESS);
    }
  } catch (error) {
    yield put(LOADING_FAIL);
  } finally {
    yield put(LOADING_IDLE);
  }
}

export default function * taskSaga() {
  yield takeLatest(taskActions.fetchTasks.type, getTasks);
  yield takeLatest(taskActions.deleteTask.type, deleteTask);
  yield takeLatest(taskActions.createTask.type, createTask);
  yield takeLatest(taskActions.saveTask.type, saveTask);
}
