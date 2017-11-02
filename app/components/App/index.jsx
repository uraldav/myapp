import React from 'react';
import { func, bool, node, object, shape, array, string } from 'prop-types';
import { compose, pure } from 'recompose';
import { Container } from 'semantic-ui-react';
import Navigation from '../Navigation/Navigation';

App.propTypes = {
  location: object.isRequired,
  children: node.isRequired,
};

App.defaultProps = {};

function App({ location, children }) {
  return (
    <div className="app">
      <Container>
        <Navigation />
      </Container>
      <Container>{children}</Container>
    </div>
  );
}

export default compose(pure)(App);
