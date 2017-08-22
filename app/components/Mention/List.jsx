import React from 'react';
import { shape, string, arrayOf } from 'prop-types';
import { compose, pure, shouldUpdate } from 'recompose';
import { equals } from 'ramda';
import injectStyles from 'react-jss';
import QueueAnim from 'rc-queue-anim';
import MentionItem, { mentionDataTypes } from './Item';

MentionList.propTypes = {
  classes: shape({
    mentionList: string.isRequired,
  }).isRequired,
  data: arrayOf(shape(mentionDataTypes)),
};

MentionList.defaultProps = {
  data: [],
};

function MentionList({
  classes,
  data,
}) {
  return (
    <div className={classes.mentionList}>
      {
        data.length
        ? <QueueAnim appear={false}>
          {
            data.map((item, idx) => (
              <MentionItem
                key={[`mention-item-${idx}`]}
                author={item.author}
                content={item.content}
                likes={item.likes}
                comments={item.comments}
                date={item.date}
              />
            ))
          }
        </QueueAnim>
        : <div />
      }
    </div>
  );
}

const styles = {
  mentionList: {
    padding: 24,

    '& > div > *:not(:last-child)': {
      marginBottom: 10,
    },
  },
};

export default compose(
  injectStyles(styles),
  shouldUpdate((props, nextProps) => !equals(props, nextProps)),
  pure,
)(MentionList);
