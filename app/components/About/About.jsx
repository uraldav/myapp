import React from 'react';
import { compose, pure } from 'recompose';

About.propTypes = {};

About.defaultProps = {};

function About() {
  return <h3>About page</h3>;
}

export default compose(pure)(About);
