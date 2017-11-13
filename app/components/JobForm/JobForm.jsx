import React from 'react';
import { compose, pure } from 'recompose';
import { Segment, Form, Input, Divider, Button } from 'semantic-ui-react';
import { NavLink, Link, Route, Switch } from 'react-router-dom';

const options = [
  { key: 'active', text: 'Active', value: 'active' },
  { key: 'archive', text: 'Archive', value: 'archive' },
];

function JobForm() {
  return (
    <Segment>
      <Form size="large">
        <Form.Input label="Job title" placeholder="Job title" />
        <Form.Input label="Location" placeholder="Location" />
        <Form.TextArea label="Description" placeholder="Job description" />
        <Form.Group>
          <Button size="large">Archive</Button>
          <Button size="large" primary>
            Publish
          </Button>
        </Form.Group>
      </Form>
    </Segment>
  );
}

export default compose(pure)(JobForm);
