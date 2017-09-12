export const fetchUserRoles = () =>
fetch('/api/user_roles',
  { method: 'GET' })
  .then(response => response.json());

export const fetchPermissions = () =>
fetch('/api/permissions',
  { method: 'GET' })
  .then(response => response.json());
