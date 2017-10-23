const fetchThematics = axios => () =>
  axios
    .get('/api/investigations_thematics')
    .then(({ data }) => ({ response: data }))
    .catch(error => ({ error }));

export default axios => ({
  fetchThematics: fetchThematics(axios),
});
