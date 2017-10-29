import React from 'react';
import { object } from 'prop-types';
import { compose, pure, withProps, getContext } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import App from '../../components/App';
import Main from '../Main/MainConnected';

NestedRoutes.propTypes = {
  store: object.isRequired,
};

function NestedRoutes({ store }) {
  return (
    <div>
      <Route exact path="/" component={Main} />
    </div>
  );
}

const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = {};

export default compose(
  getContext({
    store: object,
  }),
  withProps(props => ({
    children: NestedRoutes(props),
  })),
  pure,
)(App);
