import React from 'react';
import { shape, string, arrayOf } from 'prop-types';
import { compose, pure } from 'recompose';
import injectStyles from 'react-jss';
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
        data.map(item => (
          <MentionItem
            author={item.author}
            content={item.content}
            likes={item.likes}
            comments={item.comments}
            date={item.date}
          />
        ))
      }
    </div>
  );
}

const styles = {
  mentionList: {
    padding: 24,

    '& > *:not(:last-child)': {
      marginBottom: 10,
    },
  },
};

export default compose(
  injectStyles(styles),
  pure,
)(MentionList);
