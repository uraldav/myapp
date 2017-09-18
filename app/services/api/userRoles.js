const fetchUserRoles = axios => () =>
  axios
    .get('/api/user_roles')
    .then(({ data }) => ({ response: data }))
    .catch(error => ({ error }));

const fetchPermissions = axios => () =>
  axios
    .get('/api/permissions')
    .then(({ data }) => ({ response: data }))
    .catch(error => ({ error }));

export default axios => ({
  fetchUserRoles: fetchUserRoles(axios),
  fetchPermissions: fetchPermissions(axios),
});
