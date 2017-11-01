import React from 'react';
import { compose, pure } from 'recompose';
import { Grid } from 'semantic-ui-react';

function SignIn() {
  return (
    <Grid>
      <Grid.Column>
        <Grid.Row>Sign in form here!</Grid.Row>
      </Grid.Column>
    </Grid>
  );
}

export default compose(pure)(SignIn);
