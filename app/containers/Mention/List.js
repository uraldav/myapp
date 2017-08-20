import { compose } from 'recompose';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import MentionList from '../../components/Mention/List';
import { loadingSelector, mentionsDataSelector } from './selectors';

const mapStateToProp = createStructuredSelector({
  data: mentionsDataSelector,
  loading: loadingSelector,
});

export default compose(
  connect(mapStateToProp),
)(MentionList);
