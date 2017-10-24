import React from 'react';
import { string, oneOf, number, instanceOf, func, bool } from 'prop-types';
import { compose, pure, withState, withHandlers, lifecycle } from 'recompose';
import { Card, Icon, Tooltip, Button, Input, Tag, Popconfirm } from 'antd';
import FaIcon from 'react-fontawesome';
import TextTruncate from 'react-text-truncate';
import moment from 'moment';
import Embed from './Embed';
import './Item.less';

export const mentionDataTypes = {
  author: string,
  content: string,
  likes: number,
  comments: number,
  reposts: number,
  url: string,
  date: instanceOf(Date),
  tonality: oneOf(['positive', 'negative', 'neutral']),
};

MentionItem.propTypes = {
  ...mentionDataTypes,
  toggleOpened: func.isRequired,
  opened: bool,
  toggleTag: func.isRequired,
  tagEditing: bool,
};

MentionItem.defaultProps = {
  tonality: 'neutral',
  opened: false,
  tagEditing: false,
};

function MentionItem({
  author,
  content,
  likes,
  comments,
  reposts,
  date,
  tonality,
  url,
  opened,
  toggleOpened,
  tagEditing,
  toggleTag,
}) {
  return (
    <Card
      className={tonality}
      styleName="mention-item"
      title={<span>{author}</span>}
      extra={<span>{moment(date).format('HH:mm:ss, D MMMM')}</span>}
      onClick={() => toggleOpened()}
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
          <Tooltip title="Репосты" placement="bottomLeft">
            <span>
              <FaIcon name="share-square-o" /> {reposts}
            </span>
          </Tooltip> 
        </div>
      </div>
      {opened && (
        <div>
          <div>
            <Tag>
              Питание&nbsp;&nbsp;
              <Popconfirm title={'Удалить тег Питание?'}>
                <Icon type="close" />
              </Popconfirm>
            </Tag>
            {tagEditing ? (
              <Input
                autoFocus
                type="text"
                size="small"
                styleName="add-input"
                onBlur={() => toggleTag()}
                onPressEnter={() => toggleTag()}
              />
            ) : (
              <Button
                size="small"
                type="dashed"
                styleName="add-button"
                onClick={() => toggleTag()}
              >
                + Добавить
              </Button>
            )}
          </div>
          <div styleName="buttons">
            <Button shape="circle" size="large">
              <FaIcon name="bookmark-o" />
            </Button>
            <Button shape="circle" icon="flag" size="large" />
            <Button shape="circle" icon="user" size="large" />
            <Button shape="circle" size="large" >
            <FaIcon name="ban" />
              </Button>
            <Button shape="circle" icon="mail" size="large" />
            <Button size="large">УПК/УПЛ </Button>
          </div>
          <Embed url={url} author={author} content={content} />
        </div>
      )}
    </Card>
  );
}

export default compose(
  withState('opened', 'setOpened', false),
  withHandlers({
    toggleOpened: ({ opened, setOpened }) => () => {
      setOpened(!opened);
    },
  }),
  withState('tagEditing', 'setTagEditing', false),
  withHandlers({
    toggleTag: ({ tagEditing, setTagEditing }) => () => {
      setTagEditing(!tagEditing);
    },
  }),
  pure,
)(MentionItem);
