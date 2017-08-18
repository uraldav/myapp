import { combineReducers } from 'redux-immutable';
import { routerReducer } from 'react-router-redux';

export default function createReducers(injectedReducers) {
  return combineReducers({
    router: routerReducer,
    ...injectedReducers,
  });
}
