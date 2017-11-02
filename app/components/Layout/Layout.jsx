import React from 'react';
import { func, bool, node, object, shape, array, string } from 'prop-types';
import { compose, pure } from 'recompose';
import { Container } from 'semantic-ui-react';
import Navigation from '../Navigation/Navigation';

Layout.propTypes = {
  children: node.isRequired,
};

Layout.defaultProps = {};

function Layout({ children }) {
  return (
    <div className="layout">
      <Container>
        <h1>Navigation</h1>
        <Navigation />
      </Container>
      <Container>{children}</Container>
    </div>
  );
}

export default compose(pure)(Layout);
