import { all } from 'redux-saga/effects'
import { watchGetUsersRequest, watchCreateUserRequest, watchSetColorRequest } from './users';

export default function* rootSaga() {
  yield all([
    watchGetUsersRequest(),
    watchCreateUserRequest(),
    watchSetColorRequest()
  ]);
}