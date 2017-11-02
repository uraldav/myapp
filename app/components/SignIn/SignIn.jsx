import React from 'react';
import { compose, pure } from 'recompose';
import {
  Grid,
  Form,
  Segment,
  Button,
  Message,
  Header,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import './SignIn.scss';

function SignIn() {
  return (
    <Grid textAlign="center" className="signin">
      <Grid.Column className="signin__column">
        <Header as="h2" textAlign="center">
          Please, Sign In
        </Header>
        <Form className="signin__form">
          <Segment>
            <Form.Input label="E-mail" placeholder="john@site.com" />
            <Form.Input
              label="Password"
              placeholder="Password"
              type="password"
            />
            <Button fluid color="blue" size="large">
              Sign in
            </Button>
          </Segment>
        </Form>
        <Message className="signin__message">
          Don't have account?&nbsp;<Link to="/signup">Sing Up</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
}

export default compose(pure)(SignIn);
