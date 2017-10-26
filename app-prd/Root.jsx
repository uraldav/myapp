import React from 'react';
import { object } from 'prop-types';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Switch } from 'react-router-dom';
import { compose, pure } from 'recompose';
import { AppContainer } from 'react-hot-loader';
import { LocaleProvider } from 'antd';
import ruRU from 'antd/lib/locale-provider/ru_RU';
import AsyncRoute from 'app-common/routing/AsyncRoute.jsx';
import injectReducer from 'app-common/utils/injectReducer';
import injectSaga from 'app-common/utils/injectSaga';

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
                requireComponent={() =>
                  Promise.all([
                    import('app-common/containers/Auth'),
                    import('app-common/containers/Auth/ducks'),
                    import('app-common/containers/Auth/sagas'),
                  ]).then(([component, reducer, saga]) => {
                    injectReducer(store, 'auth', reducer);
                    injectSaga(store, saga);
                    return component;
                  })}
              />
              <AsyncRoute
                requireComponent={() =>
                  Promise.all([
                    import('./containers/App'),
                    import('./containers/App/ducks'),
                    import('./containers/App/sagas'),
                  ]).then(([component, reducer, saga]) => {
                    injectReducer(store, 'app', reducer);
                    injectSaga(store, saga);
                    store.dispatch(reducer.menuItemsRequest());
                    return component;
                  })}
              />
            </Switch>
          </LocaleProvider>
        </ConnectedRouter>
      </Provider>
    </AppContainer>
  );
}

export default compose(pure)(Root);
