import React from 'react';
import { object, func, string, array, number, shape, arrayOf } from 'prop-types';
import { compose, pure } from 'recompose';
import { Table, Tag, Button, Input, Popconfirm } from 'antd';
import './tableWithTags.less';

const recordShape = shape({
  id: number,
  name: string,
  words1: array,
  words2: array,
});

InputThematics.propTypes = {
  data: arrayOf(recordShape),
  onAddWord: func.isRequired,
  onSaveWord: func.isRequired,
  onDeleteWord: func.isRequired,
  editableCell: object,
};

InputThematics.defaultProps = {
  data: [],
  editableCell: null,
};

function InputThematics({ data, editableCell, onAddWord, onSaveWord, onDeleteWord }) {
  return (
    <Table
      pagination={false}
      columns={[
        {
          title: 'Тематика',
          width: '14%',
          dataIndex: 'name',
        },
        {
          title: 'Слова для сочетания (1)',
          width: '43%',
          dataIndex: 'words1',
          render: (tags, record) =>
            renderCellWithTags(
              tags,
              'words1',
              record.id,
              editableCell,
              onAddWord,
              onSaveWord,
              onDeleteWord,
            ),
        },
        {
          title: 'Слова для сочетания (2)',
          width: '43%',
          dataIndex: 'words2',
          render: (tags, record) =>
            renderCellWithTags(
              tags,
              'words2',
              record.id,
              editableCell,
              onAddWord,
              onSaveWord,
              onDeleteWord,
            ),
        },
      ]}
      dataSource={data.map(item => ({ ...item, key: item.id }))}
      bordered
    />
  );
}

function renderCellWithTags(
  tags,
  field,
  recordId,
  editableCell,
  onAddWord,
  onSaveWord,
  onDeleteWord,
) {
  return (
    <span styleName="tags-cell">
      {tags.map(tag => (
        <Popconfirm title="Удалить тег?" key={tag.id} onConfirm={() => onDeleteWord({ field, recordId, word: tag.word })}>
          <Tag closable onClose={e => e.preventDefault()}>
            {tag.word}
          </Tag>
        </Popconfirm>
      ))}
      {editableCell !== null &&
      editableCell.field === field &&
      editableCell.recordId === recordId ? (
        <Input
          type="text"
          size="small"
          styleName="add-input"
          onBlur={({ target }) =>
            onSaveWord({ value: target.value, field, recordId })}
          onPressEnter={({ target }) =>
            onSaveWord({ value: target.value, field, recordId })}
        />
      ) : (
        <Button
          size="small"
          type="dashed"
          onClick={() => onAddWord({ field, recordId })}
        >
          + Добавить
        </Button>
      )}
    </span>
  );
}

export default compose(pure)(InputThematics);
