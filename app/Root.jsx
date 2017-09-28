import React from 'react';
import { object } from 'prop-types';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Switch, Route } from 'react-router-dom';
import { compose, pure } from 'recompose';
import { AppContainer } from 'react-hot-loader';
import { LocaleProvider } from 'antd';
import ruRU from 'antd/lib/locale-provider/ru_RU';
import AsyncRoute from './routing/AsyncRoute';
import App from './containers/App';

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
            <Switch>
              <AsyncRoute
                exact
                path="/auth"
                requireComponent={() => {
                  return import('./containers/Auth');
                }}
              />
              <Route component={App} />
            </Switch>
          </LocaleProvider>
        </ConnectedRouter>
      </Provider>
    </AppContainer>
  );
}

export default compose(pure)(Root);
