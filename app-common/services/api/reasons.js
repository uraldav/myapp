const fetchReasons = axios => () =>
  axios
    .get('/api/reasons')
    .then(({ data }) => ({ response: data }))
    .catch(error => ({ error }));

export default axios => ({
  fetchReasons: fetchReasons(axios),
});
