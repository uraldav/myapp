export const fetchUsers = () =>
  fetch('/api/users', { method: 'GET' }).then(response => response.json());
