import React from 'react';
import { object } from 'prop-types';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Route } from 'react-router-dom';
import { compose, pure } from 'recompose';
import { AppContainer } from 'react-hot-loader';
import { LocaleProvider } from 'antd';
import ruRU from 'antd/lib/locale-provider/ru_RU';
import AsyncRoute from './routing/AsyncRoute';

Root.propTypes = {
  store: object.isRequired,
  history: object.isRequired,
};

function Root({ store, history }) {
  return (
    <AppContainer>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <LocaleProvider locale={ruRU}>
            <div>
              <AsyncRoute
                path="/auth"
                requireComponent={() => {
                  return import('./containers/Auth');
                }}
              />
              <AsyncRoute
                exact
                requireComponent={() => {
                  return import('./containers/App');
                }}
              />
              <Route component={() => <span>No page</span>} />
            </div>
          </LocaleProvider>
        </ConnectedRouter>
      </Provider>
    </AppContainer>
  );
}

export default compose(pure)(Root);
