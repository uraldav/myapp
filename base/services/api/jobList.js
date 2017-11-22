const fetchList = axios => () =>
  axios
    .get('/api/job_list')
    .then(({ data }) => ({ response: data }))
    .catch(error => ({ error }));

export default axios => ({
  fetchList: fetchList(axios),
});
