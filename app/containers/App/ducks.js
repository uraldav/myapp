import { fromJS } from 'immutable';
import { createDuck } from 'redux-duck';

const ducks = createDuck('App');

export const MENU_ITEMS_REQUEST = ducks.defineType('MENU_ITEMS_REQUEST');
export const MENU_ITEMS_SUCCESS = ducks.defineType('MENU_ITEMS_SUCCESS');
export const MENU_ITEMS_FAILURE = ducks.defineType('MENU_ITEMS_FAILURE');

export const menuItemsRequest = ducks.createAction(MENU_ITEMS_REQUEST);
export const menuItemsSuccess = ducks.createAction(MENU_ITEMS_SUCCESS);
export const menuItemsFailure = ducks.createAction(MENU_ITEMS_FAILURE);

const initialState = fromJS({
  loadingMenuItems: false,
  menuItems: {
    twitter: [],
    instagram: [],
    facebook: [],
  },
});

export default ducks.createReducer(
  {
    [MENU_ITEMS_REQUEST]: state => state.set('loadingMenuItems', true),
    [MENU_ITEMS_SUCCESS]: (state, { payload }) =>
      state.set('loadingMenuItems', false).set('menuItems', payload),
  },
  initialState,
);
