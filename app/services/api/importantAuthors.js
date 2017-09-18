const fetchAuthors = axios => () =>
  axios
    .get('/api/important_authors')
    .then(({ data }) => ({ response: data }))
    .catch(error => ({ error }));

export default axios => ({
  fetchAuthors: fetchAuthors(axios),
  deleteUser: deleteUser(axios),
  saveUser: saveUser(axios),
});
const deleteUser = axios => userRecord =>
  axios
    .delete('/api/users', { params: { id: userRecord.id } })
    .then(({ data }) => ({ response: data }))
    .catch(error => ({ error }));

const saveUser = axios => userRecord =>
  axios[userRecord.id === 0 ? 'post' : 'patch']('/api/users', userRecord)
    .then(({ data }) => ({ response: data }))
    .catch(error => ({ error }));
