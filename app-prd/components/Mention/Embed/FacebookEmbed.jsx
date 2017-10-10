import React from 'react';
import { compose, pure, withState, withHandlers, lifecycle } from 'recompose';
import { string, number } from 'prop-types';

FacebookEmbed.propTypes = {
  url: string.isRequired,
  width: number,
};

FacebookEmbed.defaultProps = {
  width: 500,
};

function FacebookEmbed({ url, width }) {
  return facebookDetectCommentary(url) ? (
    <div className="fb-comment-embed" data-href={url} data-width={width} data-include-parent />
  ) : (
    <div className="fb-post" data-href={url} data-width={width} />
  );
}

function facebookDetectCommentary(url) {
  return /\?comment_id=/.test(url);
}

export default compose(
  lifecycle({
    componentDidMount: () => window.FB.XFBML.parse(),
  }),
  pure,
)(FacebookEmbed);
