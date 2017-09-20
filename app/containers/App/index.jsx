import React from 'react';
import { object } from 'prop-types';
import { compose, pure, withProps, getContext } from 'recompose';
import App from '../../components/App';
import AsyncRoute from '../../routing/AsyncRoute';
import withAsyncDependencies from '../../utils/withAsyncDependencies';
import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';

function NestedRoutes() {
  return (
    <div>
      <AsyncRoute
        exact
        path="/"
        requireComponent={() => {
          return import('../../containers/Mention');
        }}
      />
      <AsyncRoute
        path="/users"
        requireComponent={() => {
          return import('../../containers/Users');
        }}
      />
      <AsyncRoute
        path="/thematics"
        requireComponent={() => {
          return import('../../containers/Thematics');
        }}
      />
      <AsyncRoute
        path="/user_roles"
        requireComponent={() => {
          return import('../../containers/UserRoles');
        }}
      />
      <AsyncRoute
        path="/priority_coefficients"
        requireComponent={() => {
          return import('../../containers/PriorityCoefficients');
        }}
      />
    </div>
  );
}

export default compose(
  withProps(props => ({ children: NestedRoutes(props) })),
  getContext({
    store: object,
  }),
  withAsyncDependencies(({ store }) =>
    Promise.all([
      import('./ducks'),
      import('./sagas'),
    ]).then(([reducer, saga]) => {
      injectReducer(store, 'app', reducer);
      injectSaga(store, saga);
      store.dispatch(reducer.menuItemsRequest());
    }),
  ),
  pure,
)(App);
