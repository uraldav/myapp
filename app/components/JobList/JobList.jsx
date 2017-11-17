import React from 'react';
import { compose, pure } from 'recompose';
import { string } from 'prop-types';
import { Card } from 'semantic-ui-react';

function JobList(jobs) {
  return <Card.Group itemsPerRow="1" />;
}
