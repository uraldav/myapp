import { fromJS } from 'immutable';
import { createDuck } from 'redux-duck';

const ducks = createDuck('App');

export const MENU_ITEMS_REQUEST = ducks.defineType('MENU_ITEMS_REQUEST');
export const MENU_ITEMS_SUCCESS = ducks.defineType('MENU_ITEMS_SUCCESS');
export const MENU_ITEMS_FAILURE = ducks.defineType('MENU_ITEMS_FAILURE');

export const CHANGE_EXPANDED_MENU_ITEMS = ducks.defineType(
  'CHANGE_EXPANDED_MENU_ITEMS',
);
export const CHANGE_SELECTED_MENU_ITEM = ducks.defineType(
  'CHANGE_SELECTED_MENU_ITEM',
);

export const menuItemsRequest = ducks.createAction(MENU_ITEMS_REQUEST);
export const menuItemsSuccess = ducks.createAction(MENU_ITEMS_SUCCESS);
export const menuItemsFailure = ducks.createAction(MENU_ITEMS_FAILURE);

export const changeExpandedMenuItems = ducks.createAction(
  CHANGE_EXPANDED_MENU_ITEMS,
);
export const changeSelectedMenuItem = ducks.createAction(
  CHANGE_SELECTED_MENU_ITEM,
);

const initialState = fromJS({
  loadingMenuItems: false,
  menuItems: {
    twitter: [],
    instagram: [],
    facebook: [],
    otherWords: [],
  },
  expandedMenuItems: [],
  selectedMenuItem: null,
});

export default ducks.createReducer(
  {
    [MENU_ITEMS_REQUEST]: state => state.set('loadingMenuItems', true),
    [MENU_ITEMS_SUCCESS]: (state, { payload }) =>
      state.set('loadingMenuItems', false).set('menuItems', fromJS(payload)),
    [CHANGE_EXPANDED_MENU_ITEMS]: (state, { payload }) =>
      state.set('expandedMenuItems', fromJS(payload)),
    [CHANGE_SELECTED_MENU_ITEM]: (state, { payload }) =>
      state.set('selectedMenuItem', payload),
  },
  initialState,
);
