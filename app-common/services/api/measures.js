const fetchMeasures = axios => () =>
axios
  .get('/api/measures')
  .then(({ data }) => ({ response: data }))
  .catch(error => ({ error }));

export default axios => ({
  fetchMeasures: fetchMeasures(axios),
});
