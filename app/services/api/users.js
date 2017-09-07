/* eslint no-unused-vars: 0 */
export const fetchUsers = () =>
  fetch('/api/users',
    { method: 'GET' })
    .then(response => response.json());

export const deleteUser = () =>
  fetch('/api/users',
  { method: 'DELETE' })
  .then(response => response.json());

export const createUser = () =>
  fetch('/api/users',
  { method: 'POST' })
  .then(response => response.json());
