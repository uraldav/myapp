import React from 'react';
import { object } from 'prop-types';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Switch, Route, Router } from 'react-router-dom';
import { compose, pure } from 'recompose';
import { AppContainer } from 'react-hot-loader';
import App from './containers/App';

Root.propTypes = {
  store: object.isRequired,
  history: object.isRequired,
};

function Root({ store, history }) {
  return (
    <AppContainer>
      <Provider store={store}>
        <Router history={history}>
          <Route component={App} />
        </Router>
      </Provider>
    </AppContainer>
  );
}

export default compose(pure)(Root);
