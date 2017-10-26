import React from 'react';
import { object } from 'prop-types';
import { compose, pure, withProps, lifecycle, getContext } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import AsyncRoute from 'app-common/routing/AsyncRoute.jsx';
import cookie from 'app-common/services/cookie';
import injectReducer from 'app-common/utils/injectReducer';
import injectSaga from 'app-common/utils/injectSaga';
import App from '../../components/App';
import {
  menuItemsSelector,
  expandedMenuItemsSelector,
  selectedMenuItemSelector,
  isMenuCollapsedSelector,
} from './selectors';
import { changeExpandedMenuItems, menuCollapse, menuExpand } from './ducks';

NestedRoutes.propTypes = {
  store: object.isRequired,
};

function NestedRoutes({ store }) {
  return (
    <div>
      <AsyncRoute
        exact
        path="/"
        requireComponent={() =>
          Promise.all([
            import('../Mention'),
            import('../Mention/ducks'),
            import('../Mention/sagas'),
          ]).then(([component, reducer, saga]) => {
            injectReducer(store, 'mentions', reducer);
            injectSaga(store, saga);
            return component;
          })}
      />
      <AsyncRoute
        exact
        path="/users"
        requireComponent={() =>
          Promise.all([
            import('../Users'),
            import('../Users/ducks'),
            import('../Users/sagas'),
          ]).then(([component, reducer, saga]) => {
            injectReducer(store, 'users', reducer);
            injectSaga(store, saga);
            return component;
          })}
      />
      <AsyncRoute
        exact
        path="/thematics"
        requireComponent={() =>
          Promise.all([
            import('../Thematics'),
            import('../Thematics/ducks'),
            import('../Thematics/sagas'),
          ]).then(([component, reducer, saga]) => {
            injectReducer(store, 'thematics', reducer);
            injectSaga(store, saga);
            return component;
          })}
      />
      <AsyncRoute
        exact
        path="/user_roles"
        requireComponent={() =>
          Promise.all([
            import('app-common/containers/UserRoles'),
            import('app-common/containers/UserRoles/ducks'),
            import('app-common/containers/UserRoles/sagas'),
          ]).then(([component, reducer, saga]) => {
            injectReducer(store, 'userRoles', reducer);
            injectSaga(store, saga);
            return component;
          })}
      />
      <AsyncRoute
        exact
        path="/priority_coefficients"
        requireComponent={() =>
          Promise.all([
            import('../PriorityCoefficients'),
            import('../PriorityCoefficients/ducks'),
            import('../PriorityCoefficients/sagas'),
          ]).then(([component, reducer, saga]) => {
            injectReducer(store, 'priorityCoefficients', reducer);
            injectSaga(store, saga);
            return component;
          })}
      />
      <AsyncRoute
        exact
        path="/important_authors"
        requireComponent={() =>
          Promise.all([
            import('../ImportantAuthors'),
            import('../ImportantAuthors/ducks'),
            import('../ImportantAuthors/sagas'),
          ]).then(([component, reducer, saga]) => {
            injectReducer(store, 'importantAuthors', reducer);
            injectSaga(store, saga);
            return component;
          })}
      />
    </div>
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
  getContext({
    store: object,
  }),
  withProps(props => ({
    children: NestedRoutes(props),
    isAuthorized: !!cookie.get('Authorization'),
  })),
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
