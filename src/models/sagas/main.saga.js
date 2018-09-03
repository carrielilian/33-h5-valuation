import { takeLatest, put, call } from 'redux-saga/effects';
import { actionType as mainReducer } from '../reducers/main.reducer';
import * as homeService from '../../services/home.service';

export const actionType = {
  getData: 'main/getData',
};

export function* getData() {
  const data = yield call(homeService.getDatas);
  if (data.data.success) {
    yield put({ type: mainReducer.setMain, payload: data.data.result });
  }
}

export default function* root() {
  yield [
    takeLatest(actionType.getData, getData),
  ];
}
