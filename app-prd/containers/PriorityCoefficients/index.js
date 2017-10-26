import { compose, pure } from 'recompose';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import withPermissions from 'app-common/utils/withPermissions';
import PriorityCoefficients from '../../components/PriorityCoefficients';
import { editableRecordSelector, dataSelector } from './selectors';
import { changeEditableRecord, saveRequest } from './ducks';

const mapStateToProps = createStructuredSelector({
  editableRecord: editableRecordSelector,
  data: dataSelector,
});

const mapDispatchToProps = {
  onChangeEditableRecord: changeEditableRecord,
  onSave: saveRequest,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withPermissions(['priorityCoefficientsView', 'priorityCoefficientsEdit']),
  pure,
)(PriorityCoefficients);
