import React from 'react';
import { string, oneOf, number, instanceOf, func, bool } from 'prop-types';
import { compose, pure, withState, withHandlers } from 'recompose';
import { Card, Icon, Tooltip, Button } from 'antd';
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
  toggleopened: func.isRequired,
  opened: bool.isRequired,
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
  opened,
  toggleopened,
}) {
  return (
    <Card
      className={tonality}
      styleName="mention-item"
      title={<span>{author}</span>}
      extra={<span>{moment(date).format('HH:mm:ss, D MMMM')}</span>}
      onDoubleClick={() => toggleopened()}
    >
      <div styleName="content">
        {opened ? <span>{content}</span> : <TextTruncate text={content} />}
      </div>
      <div styleName="footer">
        <div styleName="social-info">
          <Tooltip title="Комментарии" placement="bottomLeft">
            <span>
              <FaIcon name="reply" /> {comments}
            </span>
          </Tooltip>
          <Tooltip title="Мне нравится" placement="bottomLeft">
            <span>
              <Icon type="heart" /> {likes}
            </span>
          </Tooltip>
        </div>
      </div>
      {opened && (
        <div>
          <div styleName="buttons">
            <Button shape="circle" size="large">
              <FaIcon name="bookmark-o" />
            </Button>
            <Button shape="circle" icon="flag" size="large" />
            <Button shape="circle" icon="user" size="large" />
            <Button shape="circle" icon="mail" size="large" />
          </div>
          Оригинальный фрейм из источника
        </div>
      )}
    </Card>
  );
}

export default compose(
  withState('opened', 'setOpened', false),
  withHandlers({
    toggleopened: ({ opened, setOpened }) => () => {
      setOpened(!opened);
    },
  }),
  pure,
)(MentionItem);
