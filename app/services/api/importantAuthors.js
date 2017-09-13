const fetchAuthor = axios => () =>
  axios
    .get('/api/important_authors')
    .then(({ data }) => ({ response: data }))
    .catch(error => ({ error }));


export default axios => ({
  fetchAuthor: fetchAuthor(axios),
});
