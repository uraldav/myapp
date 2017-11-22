import { curry } from 'ramda';

const injectSaga = curry((store, name, saga) => {
  saga = saga.default || saga; /* eslint no-param-reassign: 0 */

  if (Reflect.has(store.injectedSagas, name)) return;

  store.injectedSagas[name] = saga;

  store.runSaga(saga);
});

export default injectSaga;
