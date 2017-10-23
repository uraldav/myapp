import { map, find, propEq } from 'ramda';

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
    twitter: map(mapper, find(propEq('socialName', 'twitter'))(response).words),
    instagram: map(
      mapper,
      find(propEq('socialName', 'instagram'))(response).words,
    ),
    facebook: map(
      mapper,
      find(propEq('socialName', 'facebook'))(response).words,
    ),
  };
}
