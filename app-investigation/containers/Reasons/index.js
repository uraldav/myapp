import { compose, pure } from 'recompose';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
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

export default compose(connect(mapStateToProps, mapDispatchToProps), pure)(
  ReasonsComponent,
);
