import { compose, pure } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import InputThematics from '../../components/Thematics/InputThematics';
import { inputThematicsSelector, editableCellSelector } from './selectors';
import { addTagInputRequest, saveTagInputRequest, deleteTagInputRequest } from './ducks';

const mapStateToProps = createStructuredSelector({
  data: inputThematicsSelector,
  editableCell: editableCellSelector,
});

const mapDispatchToProps = ({
  onAddWord: addTagInputRequest,
  onSaveWord: saveTagInputRequest,
  onDeleteWord: deleteTagInputRequest,
});


export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  pure,
)(InputThematics);
