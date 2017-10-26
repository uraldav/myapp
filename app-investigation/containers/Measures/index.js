import { compose, pure } from 'recompose';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import MeasuresComponent from '../../components/Measures';
import { dataSelector, editableRecordSelector } from './selectors';
import {
  addMeasure,
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
  onAdd: addMeasure,
  onDelete: deleteRequest,
  onSave: saveRequest,
};

export default compose(connect(mapStateToProps, mapDispatchToProps), pure)(
  MeasuresComponent,
);
