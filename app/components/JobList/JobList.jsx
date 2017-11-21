import React from 'react';
import { compose, pure } from 'recompose';
import { string, object, arrayOf, bool } from 'prop-types';
import { Card } from 'semantic-ui-react';
import JobListItem from './JobListItem';

JobList.propTypes = {
  jobs: arrayOf(object).isRequired,
  loading: bool,
};

JobList.defaultProps = {
  loading: false,
};

function JobList({ jobs, loading }) {
  return (
    <Card.Group itemsPerRow="1">
      {jobs.map(job => <JobListItem key={job.id} job={job} />)}
    </Card.Group>
  );
}

export default compose(pure)(JobList);
