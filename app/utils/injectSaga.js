const injectSaga = store => (saga) => {
  saga = saga.default || saga; /* eslint no-param-reassign: 0 */
  store.runSaga(saga);
};

export default injectSaga;
