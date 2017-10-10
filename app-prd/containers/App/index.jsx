import React from 'react';
import { object } from 'prop-types';
import { compose, pure, withProps, getContext, lifecycle } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import AsyncRoute from 'app-common/routing/AsyncRoute.jsx';
import withAsyncDependencies from 'app-common/utils/withAsyncDependencies';
import injectReducer from 'app-common/utils/injectReducer';
import injectSaga from 'app-common/utils/injectSaga';
import cookie from 'app-common/services/cookie';
import App from '../../components/App';
import {
  menuItemsSelector,
  expandedMenuItemsSelector,
  selectedMenuItemSelector,
  isMenuCollapsedSelector,
} from './selectors';
import { changeExpandedMenuItems, menuCollapse, menuExpand } from './ducks';

function NestedRoutes() {
  return (
    <Switch>
      <AsyncRoute
        exact
        path="/"
        requireComponent={() => {
          return import('../Mention');
        }}
      />
      <AsyncRoute
        exact
        path="/users"
        requireComponent={() => {
          return import('../Users');
        }}
      />
      <AsyncRoute
        path="/thematics"
        requireComponent={() => {
          return import('../Thematics');
        }}
      />
      <AsyncRoute
        exact
        path="/user_roles"
        requireComponent={() => {
          return import('app-common/containers/UserRoles');
        }}
      />
      <AsyncRoute
        exact
        path="/priority_coefficients"
        requireComponent={() => {
          return import('../PriorityCoefficients');
        }}
      />
      <AsyncRoute
        exact
        path="/important_authors"
        requireComponent={() => import('../ImportantAuthors')}
      />
      <Route
        component={() => (
          <span>
            404: Страница не найдена. Нам очень жаль. Выберите другой пункт в
            меню.
          </span>
        )}
      />
    </Switch>
  );
}

const mapStateToProps = createStructuredSelector({
  menuItems: menuItemsSelector,
  expandedMenuItems: expandedMenuItemsSelector,
  selectedMenuItem: selectedMenuItemSelector,
  isMenuCollapsed: isMenuCollapsedSelector,
});

const mapDispatchToProps = {
  onChangeExpandedMenuItems: changeExpandedMenuItems,
  onMenuCollapse: menuCollapse,
  onMenuExpand: menuExpand,
};

export default compose(
  withProps(props => ({
    children: NestedRoutes(props),
    isAuthorized: !!cookie.get('Authorization'),
  })),
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
  lifecycle({
    componentWillMount() {
      if (!cookie.get('Authorization')) {
        window.location = '/auth';
      }
    },
  }),
  connect(mapStateToProps, mapDispatchToProps),
  pure,
)(App);
