import {
  call,
  cancel,
  getContext,
  put,
  take,
  takeLatest,
} from 'redux-saga/effects';
import { notification } from 'antd';
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

  yield yield takeLatest(action => /_FAILURE/.test(action.type), failure);

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

export function* failure({ payload }) {
  notification.error({
    message: payload.message,
    duration: 0,
    description: process.env.NODE_ENV === 'production' ? '' : payload.stack,
    style: {
      width: process.env.NODE_ENV === 'production' ? 335 : 800,
      marginLeft: process.env.NODE_ENV === 'production' ? 0 : 335 - 800,
    },
  });
}
