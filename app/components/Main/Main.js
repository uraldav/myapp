import React from 'react';
import { compose, pure } from 'recompose';
import { Link } from 'react-router-dom';

Main.propTypes = {};

Main.defaultProps = {};

function Main() {
  return <h3>Main page</h3>;
}

export default compose(pure)(Main);
