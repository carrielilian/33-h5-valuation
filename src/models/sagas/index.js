import { spawn } from 'redux-saga/effects';

import loginSaga from './login.saga';

export default function* rootSaga() {
  yield [
    spawn(loginSaga),
  ];
}

