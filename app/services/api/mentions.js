/* eslint no-unused-vars: 0 */
import moment from 'moment';

const tonalityMap = (tonality) => {
  return {
    1: 'positive',
    2: 'negative',
    3: 'neutral',
  }[tonality];
};

export const fetchMentions = () =>
  fetch('/api/mentions', { method: 'GET' })
  .then(response => response.json())
  .then(data => data.map(
    ([
      nick,
      date,
      tone,
      rootId,
      socialId,
      authorId,
      body,
      url,
      likes,
      reposts,
      comments,
      weight,
    ]) => ({
      author: nick,
      date: moment.unix(date).toDate(),
      content: body,
      likes,
      comments,
      weight,
      tonality: tonalityMap(tone),
    }),
  ));
