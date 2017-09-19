const fetchAuthors = axios => () =>
  axios
    .get('/api/important_authors')
    .then(({ data }) => ({ response: data }))
    .catch(error => ({ error }));

export default axios => ({
  fetchAuthors: fetchAuthors(axios),
  deleteAuthors: deleteAuthors(axios),
  saveAuthors: saveAuthors(axios),
  fetchChanges: fetchChanges(axios),
});
const deleteAuthors = axios => record =>
  axios
    .delete('/api/important_authors', { params: { id: record.id } })
    .then(({ data }) => ({ response: data }))
    .catch(error => ({ error }));

const saveAuthors = axios => record =>
  axios[record.id === 0 ? 'post' : 'patch']('/api/important_authors', record)
    .then(({ data }) => ({ response: data }))
    .catch(error => ({ error }));

const fetchChanges = axios => () =>
  axios
    .get('/api/important_authors')
    .then(({ data }) => ({ response: data }))
    .catch(error => ({ error }));
