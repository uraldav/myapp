import React from 'react';
import { compose, pure } from 'recompose';
import { object } from 'prop-types';
import { Card } from 'semantic-ui-react';

JobListItem.propTypes = {
  job: object.isRequired,
};

function JobListItem({ job }) {
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>{job.title}</Card.Header>
        <Card.Meta>
          {job.company} {job.location}
        </Card.Meta>
      </Card.Content>
      <Card.Content extra>
        <Card.Meta>5 days ago</Card.Meta>
      </Card.Content>
    </Card>
  );
}

export default JobListItem;
