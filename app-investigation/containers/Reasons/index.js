import { object } from 'prop-types';
import { compose, pure, getContext } from 'recompose';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import withAsyncDependencies from 'app-common/utils/withAsyncDependencies';
import injectReducer from 'app-common/utils/injectReducer';
import injectSaga from 'app-common/utils/injectSaga';
import ReasonsComponent from '../../components/Reasons';
import { dataSelector, editableRecordSelector } from './selectors';
import {
  addReason,
  changeEditableRecord,
  deleteRequest,
  saveRequest,
} from './ducks';

const mapStateToProps = createStructuredSelector({
  data: dataSelector,
  editableRecord: editableRecordSelector,
});

const mapDispatchToProps = {
  onChangeEditableRecord: changeEditableRecord,
  onAdd: addReason,
  onDelete: deleteRequest,
  onSave: saveRequest,
};

export default compose(
  getContext({
    store: object,
  }),
  withAsyncDependencies(({ store }) =>
    Promise.all([
      import('./ducks'),
      import('./sagas'),
    ]).then(([reducer, saga]) => {
      injectReducer(store, 'reasons', reducer);
      injectSaga(store, saga);
    }),
  ),
  connect(mapStateToProps, mapDispatchToProps),
  pure,
)(ReasonsComponent);
