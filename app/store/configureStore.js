import { createStore, applyMiddleware, compose } from 'redux';
import { Map } from 'immutable';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import createReducer from './createReducers';
import * as api from '../services/api';
import cookie from '../services/cookie';

export default function configureStore(initialState = Map(), history) {
  const sagaMiddleware = createSagaMiddleware({
    context: {
      api,
      cookie,
    },
  });

  const middlewares = [
    sagaMiddleware,
    routerMiddleware(history),
  ];

  const enhancers = [
    applyMiddleware(...middlewares),
  ];

  /* eslint-disable */
  const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;
  /* eslint-enable */

  const store = createStore(
    createReducer(),
    initialState,
    composeEnhancers(...enhancers),
  );

  store.runSaga = sagaMiddleware.run;
  store.injectedReducers = {};

  if (module.hot) {
    module.hot.accept('./createReducers', () => {
      import('./createReducers').then((createReducers) => {
        const nextReducers = createReducers.default(store.injectedReducers);
        store.replaceReducer(nextReducers);
      });
    });
  }

  return store;
}
