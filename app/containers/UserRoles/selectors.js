import { createSelector } from 'reselect';

export const userRolesSelector = state => state.getIn(['userRoles']);

export const rolesSelector = createSelector(userRolesSelector, roles =>
  roles
    .get('data')
    .map(role => ({ id: role.get('id'), role_name: role.get('role_name') }))
    .toJS(),
);

export const dataSelector = createSelector(userRolesSelector, userRoles =>
  userRoles.get('data').toJS(),
);

export const editableRecordSelector = createSelector(
  userRolesSelector,
  userRole => userRole.get('editableRecord'),
);

export const permissionsSelector = createSelector(
  userRolesSelector,
  userRole => userRole.get('permissions').toJS(),
);

export const formattedPermissionsSelector = createSelector(editableRecordSelector, permissionsSelector, (editableRecord, permissions) => {
  if (editableRecord !== null && permissions !== null) {
    return editableRecord
      .permissions
      .map(perm => ({
        functional: perm.functional,
        value: perm.value,
        name: permissions
          .find(p => p.functional === perm.functional)
          .name,
      }));
  }
  return [];
});

export const isEditableSelector = createSelector(
  userRolesSelector,
  userRole => userRole.get('isEditing'),
);
