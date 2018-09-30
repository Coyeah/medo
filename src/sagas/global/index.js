import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import axios from 'axios';

import { setAuthority, getAuthority } from '../../utils/authority';

export const GLOBAL_ERROR = 'GLOBAL_ERROR';
export const USER_LOGIN_REQ = 'USER_LOGIN_REQ';
export const USER_LOGIN = 'USER_LOGIN';
export const USER_REGISTER_REQ = 'USER_REGISTER_REQ';
export const USER_REGISTER = 'USER_REGISTER';

// worker saga

function * userLogin (payload) {
  const url = `/api/user/login`;
  try {
    const response = yield call(axios.post, url, {
      username: payload.username,
      password: payload.password,
    });
    if (response.status === 200) {
      setAuthority(response.data.role);
      console.log(getAuthority());
      yield put({
        type: USER_LOGIN,
        payload: {
          currentUser: response.data
        }
      });
    }
  } catch (e) {
    console.log(e);
    yield put({
      type: GLOBAL_ERROR,
      payload: {
        error: e
      }
    });
  }
}

function * userRegister (payload) {
  const url = `/api/user/register`;
  try {
    const response = yield call(axios.post, url, {
      username: payload.username,
      password: payload.password,
    });
    if (response.status === 200) {
      yield put({
        type: USER_REGISTER,
      });
    }
  } catch (e) {
    console.log(e);
    yield put({
      type: GLOBAL_ERROR,
      payload: {
        error: e
      }
    });
  }
}


// watcher saga

export function * watchUserLogin () {
  yield takeLatest(USER_LOGIN_REQ, userLogin);
}

export function * watchUserRegister () {
  yield takeLatest(USER_REGISTER_REQ, userRegister);
}
