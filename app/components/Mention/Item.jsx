import React from 'react';
import { string, oneOf, number, instanceOf } from 'prop-types';
import { compose, pure } from 'recompose';
import { Card, Icon, Tooltip } from 'antd';
import FaIcon from 'react-fontawesome';
import TextTruncate from 'react-text-truncate';
import moment from 'moment';
import './Item.less';

export const mentionDataTypes = {
  author: string,
  content: string,
  likes: number,
  comments: number,
  date: instanceOf(Date),
  tonality: oneOf(['positive', 'negative', 'neutral']),
};

MentionItem.propTypes = {
  ...mentionDataTypes,
};

MentionItem.defaultProps = {
  tonality: 'neutral',
};

function MentionItem({
  author,
  content,
  likes,
  comments,
  date,
  tonality,
}) {
  return (
    <Card
      className={tonality}
      styleName="mention-item"
      title={
        <span>{author}</span>
      }
      extra={
        <span>{moment(date).format('HH:mm:ss, D MMMM')}</span>
      }
    >
      <div styleName="content">
        <TextTruncate text={content} />
      </div>
      <div styleName="footer">
        <div styleName="social-info">
          <Tooltip title="Комментарии" placement="bottomLeft">
            <span><FaIcon name="reply" /> {comments}</span>
          </Tooltip>
          <Tooltip title="Мне нравится" placement="bottomLeft">
            <span><Icon type="heart" /> {likes}</span>
          </Tooltip>
        </div>
      </div>
    </Card>
  );
}

export default compose(
  pure,
)(MentionItem);
