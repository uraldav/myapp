import {
  call,
  cancel,
  getContext,
  put,
  take,
  takeLatest,
} from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import {
  MENU_ITEMS_REQUEST,
  menuItemsSuccess,
  menuItemsFailure,
} from './ducks';

export default function* () {
  const watchMenuItemsRequest = yield takeLatest(
    MENU_ITEMS_REQUEST,
    menuItemsRequestSaga,
  );

  yield take(LOCATION_CHANGE);
  yield cancel(watchMenuItemsRequest);
}

export function* menuItemsRequestSaga() {
  const api = yield getContext('api');
  const { response, error } = yield call(api.mentionsWords.fetchMentionsWords);
  if (response) {
    yield put(menuItemsSuccess(response));
  } else {
    yield put(menuItemsFailure(error));
  }
}
