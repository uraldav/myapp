const fetchUsers = axios => () =>
  axios
    .get('/api/users')
    .then(({ data }) => ({ response: data.map(mapUserFromResponse) }))
    .catch(error => ({ error }));

const deleteUser = axios => userRecord =>
  axios
    .delete('/api/users', { params: { id: userRecord.id } })
    .then(({ data }) => ({ response: data }))
    .catch(error => ({ error }));

const saveUser = axios => userRecord =>
  axios.post(
    '/api/users',
    mapUserToRequest(userRecord),
  )
    .then(({ data }) => ({ response: mapUserFromResponse(data) }))
    .catch(error => ({ error }));

export default axios => ({
  fetchUsers: fetchUsers(axios),
  deleteUser: deleteUser(axios),
  saveUser: saveUser(axios),
});

function mapUserFromResponse(user) {
  return {
    id: user.id,
    name: `${user.firstname} ${user.lastname}`,
    login: user.login,
    email: user.email,
    position: user.position,
    userRole: user.user_role,
    dep_name: user.dep_name,
  };
}

function mapUserToRequest(user) {
  return {
    id: user.id,
    name: user.name,
    login: user.login,
    email: user.email,
    position: user.position,
    user_role: user.userRole,
    dep_name: user.dep_name,
  };
}
