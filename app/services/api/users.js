export const fetchUsers = () =>
  fetch('/api/users',
    { method: 'GET' })
    .then(response => response.json())
    .then(users => users.map(user => ({
      id: user.id,
      name: `${user.firstname} ${user.lastname}`,
      login: user.login,
      email: user.email,
      position: user.position,
      userRole: user.user_role,
    })));
