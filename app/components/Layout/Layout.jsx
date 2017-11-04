import React from 'react';
import { func, bool, node, object, shape, array, string } from 'prop-types';
import { compose, pure } from 'recompose';
import { Container } from 'semantic-ui-react';
import Navigation from '../Navigation/Navigation';

import './Layout.scss';

Layout.propTypes = {
  children: node.isRequired,
};

Layout.defaultProps = {};

function Layout({ children }) {
  return (
    <Container className="layout">
      <Container>
        <Navigation />
      </Container>
      <Container>{children}</Container>
    </Container>
  );
}

export default compose(pure)(Layout);
