import createReducers from '../store/createReducers';

const injectReducer = store => (name, reducer) => {
  reducer = reducer.default || reducer; /* eslint no-param-reassign: 0 */

  if (Reflect.has(store.injectedReducers, name)) return;

  store.injectedReducers[name] = reducer;
  store.replaceReducer(createReducers(store.injectedReducers));
};

export default injectReducer;
