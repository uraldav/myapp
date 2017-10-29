import React from 'react';
import { func, bool, node, object, shape, array, string } from 'prop-types';
import { compose, pure } from 'recompose';
import { Container } from 'reactstrap';
import Header from '../Header/Header';

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
          <Header />
        </Container>
      </div>
      <Container>{children}</Container>
    </div>
  );
}

export default compose(pure)(App);
