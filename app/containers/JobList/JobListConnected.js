import { compose, pure } from 'recompose';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { jobsListItemsSelector, jobListLoadingSelector } from './selectors';
import JobList from '../../components/JobList';

import { jobRequest, jobRequestSuccess, jobRequestFailure } from './ducks';

const mapStateToProps = createStructuredSelector({
  jobs: jobsListItemsSelector,
  loading: jobListLoadingSelector,
});

const mapDispatchToProps = {};

export default compose(connect(mapStateToProps, mapDispatchToProps), pure)(JobList);
