import { combineReducers } from 'redux-immutable';
import { routerReducer } from 'react-router-redux';

// Если нужно обрабатывать locationBeforeTransitions, то нужен доп. редьюсер:
// https://github.com/gajus/redux-immutable/#using-with-react-router-redux

export default function createReducers(injectedReducers) {
  return combineReducers({
    router: routerReducer,
    ...injectedReducers,
  });
}
