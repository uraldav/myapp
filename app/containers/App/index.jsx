import React from 'react';
import { object } from 'prop-types';
import { compose, pure, withProps, getContext } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import App from '../../components/App';
import Main from '../Main/MainConnected';
import About from '../About/AboutConnected';

const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = {};

export default compose(
  getContext({
    store: object,
  }),
  withProps(({ store }) => ({
    children: getChildren(store),
  })),
  pure,
)(App);

function getChildren(store) {
  return [
    <Route exact path="/" component={Main} key="home" />,
    <Route exact path="/about" component={About} key="about" />,
  ];
}
