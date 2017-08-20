/* eslint no-unused-vars: 0 */

export const fetchMentions = () =>
  fetch('/api/feed', { method: 'GET' })
  .then(response => response.json())
  .then(data => data.map(
    ([nick, rootId, socialId, authorId, body, url, likes, reposts, comments, weight]) => ({
      author: nick || authorId,
      date: null,
      content: body,
      likes,
      comments,
      weight,
    }),
  ));
