import React from 'react';
import { compose, pure } from 'recompose';
import {
  Grid,
  Segment,
  Form,
  Input,
  Divider,
  Button,
  Header,
} from 'semantic-ui-react';
import { NavLink, Link, Route, Switch } from 'react-router-dom';

const options = [
  { key: 'active', text: 'Active', value: 'active' },
  { key: 'archive', text: 'Archive', value: 'archive' },
];

function JobForm() {
  return (
    <Grid>
      <Grid.Column cols="16">
        <Header as="h1" textAlign="center">
          <Header.Content>Add new job</Header.Content>
          <Header.Subheader>Post a job and get responses</Header.Subheader>
        </Header>
        <Grid.Row>
          <Segment>
            <Form>
              <Form.Input label="Job title" placeholder="Job title" />
              <Form.Input label="Location" placeholder="Location" />
              <Form.TextArea
                label="Description"
                placeholder="Job description"
              />
              <Button primary>Publish</Button>
              <Button>Archive</Button>
            </Form>
          </Segment>
        </Grid.Row>
      </Grid.Column>
    </Grid>
  );
}

export default compose(pure)(JobForm);
