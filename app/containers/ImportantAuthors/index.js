import { object } from 'prop-types';
import { compose, pure, getContext } from 'recompose';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { dataSelector, editableRecordSelector } from './selectors';
import withAsyncDependencies from '../../utils/withAsyncDependencies';
import ImportantAuthors from '../../components/ImportantAuthors';
import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';

import { add, changeEditableRecord, deleteRequest, saveRequest, updateChangeRecord } from './ducks';

const mapStateToProps = createStructuredSelector({
  data: dataSelector,
  editableRecord: editableRecordSelector,
});

const mapDispatchToProps = {
  onChangeEditableRecord: changeEditableRecord,
  onAdd: add,
  onDelete: deleteRequest,
  onSave: saveRequest,
  onChange: updateChangeRecord,
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
      injectReducer(store, 'importantAuthors', reducer);
      injectSaga(store, saga);
    }),
  ),
  connect(mapStateToProps, mapDispatchToProps),
  pure,
)(ImportantAuthors);
