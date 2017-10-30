import React from 'react';
import { func, bool, node, object, shape, array, string } from 'prop-types';
import { compose, pure } from 'recompose';
import { Container } from 'reactstrap';
import Navigation from '../Navigation/Navigation';

App.propTypes = {
  location: object.isRequired,
  children: node.isRequired,
};

App.defaultProps = {};

function App({ location, children }) {
  return (
    <div className="app">
      <div className="bg-primary">
        <Container>
          <Navigation />
        </Container>
      </div>
      <Container>{children}</Container>
    </div>
  );
}

export default compose(pure)(App);
