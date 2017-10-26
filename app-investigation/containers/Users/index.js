import { compose, pure } from 'recompose';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import withPermissions from 'app-common/utils/withPermissions';
import UsersComponent from '../../components/Users/Users';
import { editableUserRecordSelector, dataSelector } from './selectors';
import {
  addUser,
  changeEditableUserRecord,
  deleteRequest,
  saveRequest,
} from './ducks';

const mapStateToProps = createStructuredSelector({
  editableUserRecord: editableUserRecordSelector,
  data: dataSelector,
});

const mapDispatchToProps = {
  onChangeEditableRecord: changeEditableUserRecord,
  onAdd: addUser,
  onDelete: deleteRequest,
  onSave: saveRequest,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withPermissions(['usersView', 'usersEdit']),
  pure,
)(UsersComponent);
