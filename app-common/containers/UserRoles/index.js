import { compose, pure } from 'recompose';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import UserRolesComponent from '../../components/UserRoles/UserRoles';
import {
  rolesSelector,
  editableRecordSelector,
  formattedPermissionsSelector,
  isEditableSelector,
} from './selectors';
import {
  selectEditableRecord,
  updateEditableRecordPermission,
  deleteUserRoleRequest,
  addUserRole,
  saveUserRole,
  changeEditableRecordName,
} from './ducks';
import withPermissions from '../../utils/withPermissions';

const mapStateToProps = createStructuredSelector({
  roles: rolesSelector,
  editableRecord: editableRecordSelector,
  userPermissions: formattedPermissionsSelector,
  isEditing: isEditableSelector,
});

const mapDispatchToProps = {
  onUserRoleClick: selectEditableRecord,
  onUserRoleDelete: deleteUserRoleRequest,
  onUserRoleAdd: addUserRole,
  onUserRoleSave: saveUserRole,
  onUserRoleRename: changeEditableRecordName,
  onUserPermissionChange: updateEditableRecordPermission,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withPermissions(['userRolesView', 'userRolesEdit']),
  pure,
)(UserRolesComponent);
