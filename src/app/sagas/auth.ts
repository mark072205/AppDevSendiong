import { takeLatest, call, put } from 'redux-saga/effects';

import {
  USER_LOGIN,
  USER_LOGIN_REQUEST,
  USER_LOGIN_COMPLETE,
  USER_LOGIN_ERROR,
} from '../actions';
import type { LoginCredentials } from '../../types/auth';
import { userLogin as userLoginApi } from '../api/auth';

export function* userLoginAsync(action: {
  type: typeof USER_LOGIN;
  payload: LoginCredentials;
}) {
  console.log('User login saga started: ', action);

  try {
    yield put({ type: USER_LOGIN_REQUEST });

    const data: unknown = yield call(userLoginApi, action.payload);

    yield put({
      type: USER_LOGIN_COMPLETE,
      payload: data,
    });
  } catch (error: unknown) {
    console.log('User login saga error: ', error);
    const message =
      error instanceof Error ? error.message : 'Login failed';
    yield put({
      type: USER_LOGIN_ERROR,
      error: message,
    });
  }
}

export function* userLogin() {
  yield takeLatest(USER_LOGIN, userLoginAsync);
}
