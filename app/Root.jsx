import React from 'react';
import { shape, func } from 'prop-types';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { compose, withHandlers } from 'recompose';
import { AppContainer } from 'react-hot-loader';
import AsyncRoute from './routing/AsyncRoute';
import injectReducer from './utils/injectReducer';
import injectSaga from './utils/injectSaga';

Root.propTypes = {
  store: shape({
    dispatch: func,
    getState: func,
  }).isRequired,
  history: shape({}).isRequired,
  setReducer: func.isRequired,
  // setSaga: func.isRequired,
};

function Root ({
  store,
  history,
  setReducer,
  // setSaga,
}) {
  return (
    <AppContainer>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div>
            <AsyncRoute
              exact
              path="/"
              requireComponent={() => {
                return new Promise((resolve) => {
                  require.ensure([], (require) => {
                    resolve(require('./containers/App'));
                  });
                });
              }}
            />
            <AsyncRoute
              path="/auth"
              requireComponent={() => {
                return new Promise((resolve) => {
                  require.ensure([], (require) => {
                    resolve(require('./containers/Auth'));
                  });
                });
              }}
              onBeforeRender={(next) => {
                Promise.all([
                  System.import('./containers/Auth/ducks'),
                  // System.import('./containers/Auth/saga'),
                ])
                  .then(([reducer]) => { // [, saga]
                    setReducer('auth', reducer);
                    // setSaga(saga);
                    next();
                  });
              }}
            />
          </div>
        </ConnectedRouter>
      </Provider>
    </AppContainer>
  );
}

export default compose(
  withHandlers({
    setReducer: ({ store }) => injectReducer(store),
    setSaga: ({ store }) => injectSaga(store),
  }),
)(Root);
