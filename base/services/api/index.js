import jobList from './jobList';

export default axios => ({
  jobList: jobList(axios),
});
