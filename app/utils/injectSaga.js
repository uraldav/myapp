const injectSaga = store => (saga) => {
  store.runSaga(saga);
};

export default injectSaga;
