import React from 'react';
import { object } from 'prop-types';
import { compose, pure, getContext, withProps } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import Main from '../../components/Main/Main';
import AsyncRoute from '../../../base/routing/AsyncRoute';
import injectReducer from '../../../base/utils/injectReducer';
import injectSaga from '../../../base/utils/injectSaga';

const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = {};

export default compose(
  getContext({ store: object }),
  withProps(({ store }) => ({
    children: getChildren(store),
  })),
  connect(mapStateToProps, mapDispatchToProps),
  pure,
)(Main);

function getChildren(store) {
  return [
    <AsyncRoute
      requireComponent={() =>
        Promise.all([
          import('../JobList/JobListConnected'),
          import('../JobList/ducks'),
          import('../JobList/sagas'),
        ]).then(([component, reducer, saga]) => {
          injectReducer(store, 'jobList', reducer);
          injectSaga(store, 'jobList', saga);
          return component;
        })
      }
    />,
  ];
}
