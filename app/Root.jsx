import React from 'react';
import { func, object } from 'prop-types';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { compose, withHandlers } from 'recompose';
import { AppContainer } from 'react-hot-loader';
import { LocaleProvider } from 'antd';
import ruRU from 'antd/lib/locale-provider/ru_RU';
import AsyncRoute from './routing/AsyncRoute';
import injectReducer from './utils/injectReducer';
import injectSaga from './utils/injectSaga';

Root.propTypes = {
  store: object.isRequired,
  history: object.isRequired,
  setReducer: func.isRequired,
  setSaga: func.isRequired,
};

function Root({ store, history, setReducer, setSaga }) {
  return (
    <AppContainer>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <LocaleProvider locale={ruRU}>
            <div>
              <AsyncRoute
                exact
                requireComponent={() => {
                  return import('./containers/App');
                }}
              />
              <AsyncRoute
                path="/auth"
                requireComponent={() => {
                  return import('./containers/Auth');
                }}
                onBeforeRender={() => {
                  return Promise.all([
                    import('./containers/Auth/ducks'),
                    import('./containers/Auth/sagas'),
                  ]).then(([reducer, saga]) => {
                    setReducer('auth', reducer);
                    setSaga(saga);
                  });
                }}
              />
            </div>
          </LocaleProvider>
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
