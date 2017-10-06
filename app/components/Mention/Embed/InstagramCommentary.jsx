import React from 'react';
import { compose, pure } from 'recompose';
import { string, number } from 'prop-types';
import './InstagramCommentary.less';

InstagramCommentary.propTypes = {
  url: string.isRequired,
  author: string.isRequired,
  content: string.isRequired,
};

function InstagramCommentary({ url, author, content }) {
  return (
    <div styleName="instagramCommentary">
      <a href={`https://www.instagram.com/${author}`} styleName="author">
        {author}
      </a>{' '}
      <span
        styleName="links"
        dangerouslySetInnerHTML={{ __html: prepareTags(prepareUsers(content)) }}
      />
    </div>
  );
}

function prepareTags(content) {
  return content.replace(
    /#[a-zA-Z_.0-9]+/gi,
    match =>
      `<a href='https://www.instagram.com/explore/tags/match/${match.slice(
        1,
      )}'>${match}</a>`,
  );
}

function prepareUsers(content) {
  return content.replace(
    /@[a-zA-Z_.0-9]+/gi,
    match =>
      `<a href='https://www.instagram.com/${match.slice(1)}'>${match}</a>`,
  );
}

export default compose(pure)(InstagramCommentary);
