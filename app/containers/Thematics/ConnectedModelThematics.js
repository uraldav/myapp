import { compose, pure } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import ModelThematics from '../../components/Thematics/ModelThematics';
import {
  modelThematicsSelector,
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

const mapStateToProps = createStructuredSelector({
  data: modelThematicsSelector,
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

export default compose(connect(mapStateToProps, mapDispatchToProps), pure)(
  ModelThematics,
);
