import React from 'react';
import { compose, pure } from 'recompose';
import { string } from 'prop-types';
import { Card } from 'semantic-ui-react';

JobCard.propTypes = {
  title: string.isRequired,
  company: string.isRequired,
  location: string.isRequired,
};

function JobCard({ title, company, location }) {
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>{title}</Card.Header>
        <Card.Meta>
          {company} {location}
        </Card.Meta>
      </Card.Content>
      <Card.Content extra>
        <Card.Meta>5 days ago</Card.Meta>
      </Card.Content>
    </Card>
  );
}

export default compose(pure)(JobCard);
