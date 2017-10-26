import { compose, pure } from 'recompose';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import withPermissions from 'app-common/utils/withPermissions';
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
  connect(mapStateToProps, mapDispatchToProps),
  withPermissions(['importantAuthorsView', 'importantAuthorsEdit']),
  pure,
)(ImportantAuthors);
