const fetchPriorityCoefficients = axios => () =>
  axios
    .get('/api/priority_coefficients')
    .then(({ data }) => ({ response: data }))
    .catch(error => ({ error }));

const save = axios => record =>
  axios[record.id === 0 ? 'create' : 'patch'](
    '/api/priority_coefficients',
  ).catch(error => ({ error }));

export default axios => ({
  fetchPriorityCoefficients: fetchPriorityCoefficients(axios),
  save: save(axios),
});
