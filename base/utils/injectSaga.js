import { curry } from 'ramda';

const injectSaga = curry((store, saga) => {
  saga = saga.default || saga; /* eslint no-param-reassign: 0 */
  store.runSaga(saga);
});

export default injectSaga;
