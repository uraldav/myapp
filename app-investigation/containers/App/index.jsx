import React from 'react';
import { object } from 'prop-types';
import { compose, pure, withProps, getContext, lifecycle } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import AsyncRoute from 'app-common/routing/AsyncRoute.jsx';
import injectReducer from 'app-common/utils/injectReducer';
import injectSaga from 'app-common/utils/injectSaga';
import cookie from 'app-common/services/cookie';
import App from '../../components/App';
import {
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
            import('../Investigations/InvestigationConnected'),
            import('../Investigations/ducks'),
            import('../Investigations/sagas'),
          ]).then(([component, reducer, saga]) => {
            injectReducer(store, 'investigations', reducer);
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
        path="/mass_measures"
        requireComponent={() =>
          Promise.all([
            import('../MassMeasures'),
            import('../MassMeasures/ducks'),
            import('../MassMeasures/sagas'),
          ]).then(([component, reducer, saga]) => {
            injectReducer(store, 'massMeasures', reducer);
            injectSaga(store, saga);
            return component;
          })}
      />
      <AsyncRoute
        exact
        path="/departments"
        requireComponent={() =>
          Promise.all([
            import('../Departments'),
            import('../Departments/ducks'),
            import('../Departments/sagas'),
          ]).then(([component, reducer, saga]) => {
            injectReducer(store, 'departments', reducer);
            injectSaga(store, saga);
            return component;
          })}
      />
      <AsyncRoute
        exact
        path="/reasons"
        requireComponent={() =>
          Promise.all([
            import('../Reasons'),
            import('../Reasons/ducks'),
            import('../Reasons/sagas'),
          ]).then(([component, reducer, saga]) => {
            injectReducer(store, 'reasons', reducer);
            injectSaga(store, saga);
            return component;
          })}
      />
      <AsyncRoute
        exact
        path="/measures"
        requireComponent={() =>
          Promise.all([
            import('../Measures'),
            import('../Measures/ducks'),
            import('../Measures/sagas'),
          ]).then(([component, reducer, saga]) => {
            injectReducer(store, 'measures', reducer);
            injectSaga(store, saga);
            return component;
          })}
      />
      <AsyncRoute
        exact
        path="/thematics"
        requireComponent={() =>
          Promise.all([
            import('../Thematics/ThematicsConnected'),
            import('../Thematics/ducks'),
            import('../Thematics/sagas'),
          ]).then(([component, reducer, saga]) => {
            injectReducer(store, 'thematics', reducer);
            injectSaga(store, saga);
            return component;
          })}
      />
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
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
  getContext({ store: object }),
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
