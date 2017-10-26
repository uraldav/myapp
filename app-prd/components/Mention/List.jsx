import React from 'react';
import { object, shape, arrayOf, bool, func } from 'prop-types';
import { compose, pure, shouldUpdate } from 'recompose';
import { equals } from 'ramda';
import QueueAnim from 'rc-queue-anim';
import MentionItem, { mentionDataTypes } from './Item';
import './List.less';

MentionList.propTypes = {
  data: arrayOf(shape(mentionDataTypes)),
  loading: bool,
  selectedRecord: object,
  onSelectMention: func.isRequired,
};

MentionList.defaultProps = {
  data: [],
  loading: false,
  selectedRecord: null,
};

function MentionList({ data, loading, selectedRecord, onSelectMention }) {
  // чтобы получить в QueueAnim анимированность, надо глянуть в сторону привязки id к строке.
  return (
    <div styleName="mention-list">
      {data.length ? (
        <QueueAnim appear={false}>
          {data.map((item, idx) => (
            <MentionItem
              key={[`mention-item-${idx}`]}
              author={item.author}
              content={item.content}
              likes={item.likes}
              comments={item.comments}
              date={item.date}
              tonality={item.tonality}
              url={item.url}
              reposts={item.reposts}
              opened={selectedRecord && item.content === selectedRecord.content}
              onClick={() => onSelectMention(item)}
            />
          ))}
        </QueueAnim>
      ) : (
        <div />
      )}
    </div>
  );
}

export default compose(
  shouldUpdate((props, nextProps) => !equals(props, nextProps)),
  pure,
)(MentionList);
