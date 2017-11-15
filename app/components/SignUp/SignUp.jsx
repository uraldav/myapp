import React from 'react';
import { compose, pure } from 'recompose';
import {
  Grid,
  Form,
  Segment,
  Button,
  Message,
  Header,
  Input,
  Divider,
  Icon,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

function SignUp() {
  return (
    <Grid>
      <Grid.Column width="16">
        <Header as="h1" textAlign="center" icon>
          <Icon name="space shuttle" rotated="counterclockwise" />
          <Header.Content>Join Hidev.io</Header.Content>
          <Header.Subheader>
            The way to get in front of top tech talent
          </Header.Subheader>
        </Header>
        <Segment>
          <Form>
            <Form.Field
              control={Input}
              label="Company name"
              placeholder="Company name"
            />
            <Divider section />
            <Form.Field
              control={Input}
              label="E-mail"
              placeholder="E-mail"
              type="email"
            />
            <Form.Field
              control={Input}
              label="Password"
              placeholder="Password"
              type="password"
            />
            <Divider section />
            <Form.Button color="blue" size="large">
              Create an accout
            </Form.Button>
          </Form>
        </Segment>
        <Message className="signin__message">
          Already have account?&nbsp;<Link to="/signin">
            Sing in to your accout
                                     </Link>&nbsp;to post jobs.
        </Message>
      </Grid.Column>
    </Grid>
  );
}

export default compose(pure)(SignUp);
