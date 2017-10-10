import { map } from 'ramda';

const fetchMentionsWords = axios => () =>
  axios
    .get('/api/mentions_words')
    .then(({ data }) => ({ response: mapFromResponse(data) }))
    .catch(error => ({ error }));

export default axios => ({
  fetchMentionsWords: fetchMentionsWords(axios),
});

function mapFromResponse(response) {
  const mapper = x => ({ word: x.word, mentionCount: x.mention_count });
  return {
    twitter: map(mapper, response.twitter),
    instagram: map(mapper, response.instagram),
    facebook: map(mapper, response.facebook),
  };
}
