import { compose } from 'recompose';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import MentionList from '../../components/Mention/List';
import {
  loadingSelector,
  mentionsDataSelector,
  selectedRecordSelector,
} from './selectors';
import { selectRecord } from './ducks';

const mapStateToProp = createStructuredSelector({
  data: mentionsDataSelector,
  loading: loadingSelector,
  selectedRecord: selectedRecordSelector,
});

const mapDispatchToProps = {
  onSelectMention: selectRecord,
};

export default compose(connect(mapStateToProp, mapDispatchToProps))(
  MentionList,
);
