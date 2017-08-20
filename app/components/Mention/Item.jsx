import React from 'react';
import { shape, string, oneOf, number, instanceOf } from 'prop-types';
import { compose, pure } from 'recompose';
import injectStyles from 'react-jss';
import { Card, Icon, Tooltip } from 'antd';
import FaIcon from 'react-fontawesome';
import cn from 'classnames';
import TextTruncate from 'react-text-truncate';
import moment from 'moment';

export const mentionDataTypes = {
  author: string,
  content: string,
  likes: number,
  comments: number,
  date: instanceOf(Date),
  tonality: oneOf(['positive', 'negative', 'neutral']),
};

MentionItem.propTypes = {
  classes: shape({
    mentionItem: string.isRequired,
    title: string.isRequired,
    content: string.isRequired,
  }).isRequired,
  ...mentionDataTypes,
};

MentionItem.defaultProps = {
  tonality: 'neutral',
};

function MentionItem({
  classes,
  author,
  content,
  likes,
  comments,
  date,
  tonality,
}) {
  return (
    <Card
      className={cn(classes.mentionItem, tonality)}
      title={
        <span className={classes.title}>
          <span>{author}</span>
          <span>{moment(date).format('HH:mm:ss, D MMMM')}</span>
        </span>
      }
    >
      <div className={classes.content}>
        <TextTruncate text={content} />
      </div>
      <div className={classes.footer}>
        <div className={classes.socialInfo}>
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

const styles = {
  mentionItem: {
    '&.positive': {
      border: '1px solid green',
    },
    '&.negative': {
      border: '1px solid red',
    },
    '&.neutral': {
      border: '1px solid gray',
    },
  },

  title: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  content: {},

  footer: {
    display: 'flex',
  },
  socialInfo: {
    flex: 1,
    textAlign: 'right',

    '& > *:not(:first-child)': {
      marginLeft: 10,
    },
  },
};

export default compose(
  injectStyles(styles),
  pure,
)(MentionItem);
