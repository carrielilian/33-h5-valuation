import { takeLatest, call } from 'redux-saga/effects';
import * as homeService from '../../services/home.service';

export const actionType = {
  loginFUNC: 'login/loginFUNC',
};

export function* loginFUNC({ payload: { query, successFunc } }) {
  const data = yield call(homeService.loginFUNC, query);
  if (data.data.success) {
    const TOKEN = data.headers['x-auth-token'];
    successFunc(TOKEN);
  }
}

export default function* root() {
  yield [
    takeLatest(actionType.loginFUNC, loginFUNC),
  ];
}
