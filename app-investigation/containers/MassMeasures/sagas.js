import { put, take, select } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { dataSelector } from './selectors';
import { changeEditableMeasure } from './ducks';

export default function* () {
  const data = yield select(dataSelector);
  yield put(changeEditableMeasure(data[0]));

  yield take(LOCATION_CHANGE);
}
