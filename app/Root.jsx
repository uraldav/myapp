import React from 'react';
import { func, object } from 'prop-types';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { compose, withHandlers } from 'recompose';
import { AppContainer } from 'react-hot-loader';
import { LocaleProvider } from 'antd';
import { ThemeProvider } from 'react-jss';
import ruRU from 'antd/lib/locale-provider/ru_RU';
import AsyncRoute from './routing/AsyncRoute';
import injectReducer from './utils/injectReducer';
import injectSaga from './utils/injectSaga';
import theme from './style/theme';

Root.propTypes = {
  store: object.isRequired,
  history: object.isRequired,
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
        <ThemeProvider theme={theme()}>
          <ConnectedRouter history={history}>
            <LocaleProvider locale={ruRU}>
              <div>
                <AsyncRoute
                  exact
                  path="/"
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
                      // import('./containers/Auth/saga'),
                    ])
                    .then(([reducer]) => { // [, saga]
                      setReducer('auth', reducer);
                      // setSaga(saga);
                    });
                  }}
                />
              </div>
            </LocaleProvider>
          </ConnectedRouter>
        </ThemeProvider>
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
