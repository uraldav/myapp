import React from 'react';
import { object } from 'prop-types';
import { compose, pure, withProps, getContext } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import App from '../../components/App';
import Main from '../Main/MainConnected';
import About from '../About/AboutConnected';
import SignIn from '../SignIn/SignInConnected';
import SignUp from '../SignUp/SignUpConnected';
import Layout from '../Layout/LayoutConnected';
import Profile from '../Profile/ProfileConnected';

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
  return (
    <Switch>
      <Route exact path="/signin" component={SignIn} />

      <Redirect from="/404" to="/signin" />
      <Route>
        <Layout>
          <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/about" component={About} />
            <Route exact path="/signup" component={SignUp} />
            <Route path="/profile" component={Profile} />
          </Switch>
        </Layout>
      </Route>
    </Switch>
  );
}
