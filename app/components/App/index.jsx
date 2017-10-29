import React from 'react';
import { func, bool, node, object, shape, array, string } from 'prop-types';
import { compose, pure } from 'recompose';

App.propTypes = {
  location: object.isRequired,
  children: node.isRequired,
};

App.defaultProps = {};

function App({ location, children }) {
  return <div>{children}</div>;
}

export default compose(pure)(App);
