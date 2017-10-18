const fetchPriorityCoefficients = axios => () =>
  axios
    .get('/api/priority_coefficients')
    .then(({ data }) => ({ response: data }))
    .catch(error => ({ error }));

const save = axios => record =>
  axios.post(
    '/api/priority_coefficients', record,
  ).then(({ data }) => ({ response: data }))
  .catch(error => ({ error }));

export default axios => ({
  fetchPriorityCoefficients: fetchPriorityCoefficients(axios),
  save: save(axios),
});
