import { compose, pure } from 'recompose';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import JobList from '../../components/JobList';
import { jobsSelector, loadingJobsSelector } from './selectors';
// import {} from './ducks';

const mapStateToProps = createStructuredSelector({
  jobs: jobsSelector,
  loading: loadingJobsSelector,
});

const mapDispatchToProps = {};

export default compose(connect(mapStateToProps, mapDispatchToProps), pure)(JobList);
