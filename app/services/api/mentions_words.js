const fetchMentionsWords = axios => () =>
  axios
    .get('/api/mentions_words')
    .then(({ data }) => ({ response: data }))
    .catch(error => ({ error }));

export default axios => ({
  fetchMentionsWords: fetchMentionsWords(axios),
});
