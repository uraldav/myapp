import {
  call,
  cancel,
  getContext,
  put,
  take,
  takeLatest,
  select,
} from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import queryString from 'query-string';
import { uniq, append } from 'ramda';
import {
  MENU_ITEMS_REQUEST,
  menuItemsSuccess,
  menuItemsFailure,
  changeExpandedMenuItems,
  changeSelectedMenuItem,
} from './ducks';
import { expandedMenuItemsSelector } from './selectors';
import { locationSelector } from '../../store/globalSelectors';

export default function* () {
  const watchMenuItemsRequest = yield takeLatest(
    MENU_ITEMS_REQUEST,
    menuItemsRequestSaga,
  );

  const location = yield select(locationSelector);
  const expandedMenuItems = yield select(expandedMenuItemsSelector);

  const queryParams = queryString.parse(location.search);

  if (location.pathname === '/') {
    if (queryParams.socialId) {
      yield put(
        changeExpandedMenuItems(
          uniq(append(queryParams.socialId, expandedMenuItems)),
        ),
      );
      yield put(changeSelectedMenuItem({ item: queryParams.socialId }));
      if (queryParams.socialWord) {
        yield put(
          changeSelectedMenuItem({
            item: queryParams.socialWord,
            parent: queryParams.socialId,
          }),
        );
      }
    }
  } else {
    yield put(
      changeExpandedMenuItems(uniq(append('settings', expandedMenuItems))),
    );
    yield put(
      changeSelectedMenuItem({
        item: location.pathname.replace('/', ''),
        parent: 'settings',
      }),
    );
  }

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
