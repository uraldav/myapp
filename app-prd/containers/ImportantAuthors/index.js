import { object } from 'prop-types';
import { compose, pure, getContext } from 'recompose';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import withAsyncDependencies from 'app-common/utils/withAsyncDependencies';
import withPermissions from 'app-common/utils/withPermissions';
import injectReducer from 'app-common/utils/injectReducer';
import injectSaga from 'app-common/utils/injectSaga';
import { dataSelector, editableRecordSelector } from './selectors';
import ImportantAuthors from '../../components/ImportantAuthors';

import {
  add,
  changeEditableRecord,
  deleteRequest,
  saveRequest,
  updateChangeRecord,
} from './ducks';

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
  withPermissions(['importantAuthorsView', 'importantAuthorsEdit']),
  pure,
)(ImportantAuthors);
