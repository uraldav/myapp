import React from 'react';
import { compose, pure } from 'recompose';

function Users() {
  return (
    <div>
      fake text
    </div>
  );
}

export default compose(
  pure,
)(Users);
