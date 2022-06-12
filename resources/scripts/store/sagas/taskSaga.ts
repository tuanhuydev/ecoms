import { AxiosResponse } from 'axios';
import { LOADING_STATE } from '../../configs/enums';
import { call, put, takeEvery } from 'redux-saga/effects';
import { taskActions } from '../slices/taskSlice';
import TaskService from '../../services/TaskService';

export function * getTasks() {
  try {
    yield put({ type: taskActions.setLoading.type, payload: LOADING_STATE.LOADING });
    const { data }: AxiosResponse = yield call(TaskService.getTasks);
    yield put({ type: taskActions.setTasks.type, payload: data.tasks });
    yield put({ type: taskActions.setLoading.type, payload: LOADING_STATE.SUCCESS });
  } catch (error) {
    yield put({ type: taskActions.setLoading.type, payload: LOADING_STATE.FAIL });
  }
}

export function * createTask(action: any) {
  try {
    yield put({ type: taskActions.setLoading.type, payload: LOADING_STATE.LOADING });
    const { data }: AxiosResponse = yield call(TaskService.createTask, action.payload);
    if (data?.id) {
      const newTask = {
        ...action.payload,
        id: data?.id
      };
      yield put({ type: taskActions.addTask.type, payload: newTask });
      yield put({ type: taskActions.setLoading.type, payload: LOADING_STATE.SUCCESS });
    }
  } catch (error) {
    yield put({ type: taskActions.setLoading.type, payload: LOADING_STATE.FAIL });
  } finally {
    yield put({ type: taskActions.setLoading.type, payload: LOADING_STATE.IDLE });
  }
}

export function * deleteTask(action: any) {
  try {
    yield put({ type: taskActions.setLoading.type, payload: LOADING_STATE.LOADING });
    const { data }: AxiosResponse = yield call(TaskService.deleteTask, action.payload);
    if (data.success) {
      yield put({ type: taskActions.removeTask.type, payload: action.payload });
      yield put({ type: taskActions.setLoading.type, payload: LOADING_STATE.SUCCESS });
    }
  } catch (error) {
    yield put({ type: taskActions.setLoading.type, payload: LOADING_STATE.FAIL });
  } finally {
    yield put({ type: taskActions.setLoading.type, payload: LOADING_STATE.IDLE });
  }
}

export default function * taskSaga() {
  yield takeEvery(taskActions.fetchTasks.type, getTasks);
  yield takeEvery(taskActions.deleteTask.type, deleteTask);
  yield takeEvery(taskActions.createTask.type, createTask);
}
