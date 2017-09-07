/* eslint no-unused-vars: 0 */
import moment from 'moment';
import { zipObj } from 'ramda';
import queryString from 'query-string';

const tonalityMap = (tonality, reverseKeys) => {
  let keys = [[1, 2, 3], ['positive', 'negative', 'neutral']];
  if (reverseKeys) keys = keys.reverse();
  return zipObj(...keys)[tonality];
};

export const fetchMentions = (socialId, priority, status, themes, tonality, followers, users, datePeriod) =>
  fetch(`/api/mentions?${
    queryString.stringify({ socialId, priority, status, themes, tonality, followers, users, datePeriod })
  }`,
  { method: 'GET' })
  .then(response => response.json())
  .then(mapMentions);

function mapMentions(data) {
  return data.map(
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
  );
}
