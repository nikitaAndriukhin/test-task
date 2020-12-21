import { takeEvery, takeLatest, call, select, put } from 'redux-saga/effects';
import history from '../history'

import {
  GET_USERS_REQUEST,
  CREATE_USER_REQUEST,
  SET_COLOR_REQUEST,
  getUsersSuccess,
  usersError
} from '../actions/usersActions';
import * as api from '../api/users';

function* getUsers(action) {
  try {
    const result = yield call(api.getUsers, { id: action.payload.id });
    yield put(getUsersSuccess(result.data));

  } catch(e) {
    yield put(usersError({
      errors: 'An error occurred when trying to get the users'
    }));
  }
}

function* createUser(action) {
  try {
    const result = yield call(api.createUser, { username: action.payload.username, color: action.payload.color });
    yield put(getUsersSuccess(result.data))
    yield call(getUsers);
    yield put({ type: 'USER_CREATED' });
    const id = yield select(state => state.users.items.id)
    yield call(history.push, `/example-page2/user=${id}`)
  } catch(e) {
    yield put(usersError({
      errors: 'An error occurred when trying to create the user'
    }));
  }
}

function* setColor(action) {
  try {
    yield call(api.setColor, { id: action.payload.id, color: action.payload.color });
    yield call(getUsers);
    const id = yield select(state => state.users.items.id)
    yield call(history.push, `/example-page3/user=${id}`)
  } catch(e) {
    yield put(usersError({
      errors: 'An error occurred when trying to set the color'
    }));
  }
}

export function* watchGetUsersRequest() {
  yield takeEvery(GET_USERS_REQUEST, getUsers);
}

export function* watchCreateUserRequest() {
  yield takeLatest(CREATE_USER_REQUEST, createUser);
}

export function* watchSetColorRequest() {
  yield takeLatest(SET_COLOR_REQUEST, setColor);
}