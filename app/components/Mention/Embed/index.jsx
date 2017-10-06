import React from 'react';
import { compose, pure } from 'recompose';
import { string } from 'prop-types';
import InstagramEmbed from 'react-instagram-embed';
import TweetEmbed from 'react-tweet-embed';
import FacebookEmbed from './FacebookEmbed';
import InstagramCommentary from './InstagramCommentary';

Embed.propTypes = {
  url: string.isRequired,
  author: string.isRequired,
  content: string.isRequired,
};

function Embed({ url, author, content }) {
  return (
    <div>
      {detectSocialNetwork(url) === 'instagram' && (
        <div>
          <InstagramEmbed
            url={prepareUrlInstagram(url)}
            maxWidth={720}
            onLoading={() => {}}
            onSuccess={() => {}}
            onAfterRender={() => {}}
            onFailure={() => {}}
          />
          {detectInstagramCommentary(url) && (
            <InstagramCommentary author={author} content={content} url={url} />
          )}
        </div>
      )}
      {detectSocialNetwork(url) === 'twitter' && (
        <TweetEmbed id={prepareIdTwitter(url)} />
      )}
      {detectSocialNetwork(url) === 'facebook' && <FacebookEmbed url={url} />}
    </div>
  );
}

function detectSocialNetwork(url) {
  if (/instagram.com/.test(url)) return 'instagram';
  if (/twitter.com/.test(url)) return 'twitter';
  if (/facebook.com/.test(url)) return 'facebook';
  return '';
}

function prepareUrlInstagram(url) {
  return /instagram.com\/p\/.*\//.exec(url)[0];
}

function detectInstagramCommentary(url) {
  return /\/#/.test(url);
}

function prepareIdTwitter(url) {
  return url.split('/').slice(-1)[0];
}

export default compose(pure)(Embed);
