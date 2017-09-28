import { compose, pure } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import ModelThematics from '../../components/Thematics/ModelThematics';
import {
  modelThematicsSelector,
  modelThematicLoadingSelector,
  editableModelCellSelector,
  editableModelThematicSelector,
} from './selectors';
import {
  addTagModelRequest,
  saveTagModelRequest,
  deleteTagModelRequest,
  addThematicModel,
  deleteThematicModelRequest,
  changeEditableModelThematic,
  saveThematicModelRequest,
} from './ducks';
import withPermissions from '../../utils/withPermissions';

const mapStateToProps = createStructuredSelector({
  data: modelThematicsSelector,
  loading: modelThematicLoadingSelector,
  editableCell: editableModelCellSelector,
  editableThematic: editableModelThematicSelector,
});

const mapDispatchToProps = {
  onAddWord: addTagModelRequest,
  onSaveWord: saveTagModelRequest,
  onDeleteWord: deleteTagModelRequest,
  onAddThematic: addThematicModel,
  onDeleteThematic: deleteThematicModelRequest,
  onChangeEditableThematic: changeEditableModelThematic,
  onSaveThematic: saveThematicModelRequest,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withPermissions(['thematicsView', 'thematicsEdit']),
  pure,
)(ModelThematics);
