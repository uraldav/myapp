import React from 'react';
import { compose, pure } from 'recompose';
import { string, object, arrayOf } from 'prop-types';
import { Card } from 'semantic-ui-react';
import JobListItem from './JobListItem';

JobList.propTypes = {
  jobs: arrayOf(object).isRequired,
};

function JobList({ jobs }) {
  return (
    <Card.Group itemsPerRow="1">
      {jobs.map(job => <JobListItem key={job.id} job={job} />)}
    </Card.Group>
  );
}

export default compose(pure)(JobList);
