import { object } from 'prop-types';
import { compose, pure, getContext } from 'recompose';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import withAsyncDependencies from '../../utils/withAsyncDependencies';
import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
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
  getContext({
    store: object,
  }),
  withAsyncDependencies(({ store }) =>
    Promise.all([
      import('./ducks'),
      import('./sagas'),
    ]).then(([reducer, saga]) => {
      injectReducer(store, 'userRoles', reducer);
      injectSaga(store, saga);
    }),
  ),
  connect(mapStateToProps, mapDispatchToProps),
  withPermissions(['userRolesView', 'userRolesEdit']),
  pure,
)(UserRolesComponent);
