import { compose, pure } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import InputThematics from '../../components/Thematics/InputThematics';
import { inputThematicsSelector, editableCellSelector, editableInputThematicSelector } from './selectors';
import { addTagInputRequest, saveTagInputRequest, deleteTagInputRequest, addThematicInput, deleteThematicInputRequest, changeEditableInputThematic, saveThematicInputRequest } from './ducks';

const mapStateToProps = createStructuredSelector({
  data: inputThematicsSelector,
  editableCell: editableCellSelector,
  editableThematic: editableInputThematicSelector,
});

const mapDispatchToProps = ({
  onAddWord: addTagInputRequest,
  onSaveWord: saveTagInputRequest,
  onDeleteWord: deleteTagInputRequest,
  onAddThematic: addThematicInput,
  onDeleteThematic: deleteThematicInputRequest,
  onChangeEditableThematic: changeEditableInputThematic,
  onSaveThematic: saveThematicInputRequest,
});


export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  pure,
)(InputThematics);
