import React from 'react';
import {
  object,
  bool,
  func,
  string,
  array,
  number,
  shape,
  arrayOf,
} from 'prop-types';
import { compose, pure, withHandlers } from 'recompose';
import { Table, Tag, Button, Input, Popconfirm, Modal } from 'antd';
import { path } from 'ramda';
import EditableCell from '../ui/Table/EditableCell';
import './tableWithTags.less';

const recordShape = shape({
  id: number,
  name: string,
  words1: array,
  words2: array,
});

ModelThematics.propTypes = {
  data: arrayOf(recordShape),
  loading: bool,
  onAddWord: func.isRequired,
  onSaveWord: func.isRequired,
  onDeleteWord: func.isRequired,
  editableCell: object,
  onAddThematic: func.isRequired,
  onDeleteThematic: func.isRequired,
  editableThematic: object,
  onChangeEditableThematic:
    func.isRequired /* eslint react/no-unused-prop-types: 0 */,
  handleCellChange: func.isRequired,
  handleCancel: func.isRequired,
  onSaveThematic: func.isRequired,
  handleEdit: func.isRequired,
};

ModelThematics.defaultProps = {
  data: [],
  loading: false,
  editableCell: null,
  editableThematic: null,
};

function ModelThematics({
  data,
  loading,
  editableCell,
  onAddWord,
  onSaveWord,
  onDeleteWord,
  editableThematic,
  onAddThematic,
  onDeleteThematic,
  handleCellChange,
  handleCancel,
  onSaveThematic,
  handleEdit,
}) {
  return (
    <Table
      loading={loading}
      title={() => (
        <Button
          type="primary"
          icon="plus"
          disabled={editableThematic !== null}
          onClick={onAddThematic}
        >
          Добавить
        </Button>
      )}
      pagination={false}
      dataSource={data.map(item => ({ ...item, key: item.id }))}
      columns={[
        {
          title: 'Тематика',
          dataIndex: 'name',
          render: (tags, record, index) => {
            const isEditableCell =
              editableThematic !== null && editableThematic.id === record.id;

            if (isEditableCell) {
              return (
                <EditableCell
                  autoFocus
                  editable
                  value={path('name'.split('.'), editableThematic)}
                  onChange={value => handleCellChange('name', index, value)}
                />
              );
            }
            return path('name'.split('.'), record);
          },
        },
        {
          title: 'Слова для сочетания (1)',
          width: '40%',
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
              editableThematic,
            ),
        },
        {
          title: 'Слова для сочетания (2)',
          width: '40%',
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
              editableThematic,
            ),
        },
        {
          title: '',
          key: 'operation',
          width: '120px',
          fixed: 'right',

          render: (text, record) => {
            return (
              <span styleName="action-button-wrapper">
                {editableThematic && editableThematic.id === record.id ? (
                  <span>
                    <Button.Group>
                      <Button icon="save" onClick={onSaveThematic} />
                      <Popconfirm
                        title="Отменить изменения?"
                        onConfirm={handleCancel}
                      >
                        <Button icon="close" />
                      </Popconfirm>
                    </Button.Group>
                  </span>
                ) : (
                  <span>
                    <Button
                      icon="edit"
                      disabled={editableThematic !== null}
                      onClick={() => handleEdit(record)}
                    />
                  </span>
                )}
                <span className="ant-divider" />
                <Button
                  icon="delete"
                  onClick={() =>
                    Modal.confirm({
                      title: 'Удалить тематику?',
                      content: `Вы уверены, что хотите удалить тематику ${record.name}?`,
                      iconType: 'exclamation-circle',
                      onOk: () => Promise.resolve(onDeleteThematic(record)),
                    })}
                />
              </span>
            );
          },
        },
      ]}
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
  editableThematic,
) {
  return (
    <span styleName="tags-cell">
      {tags &&
        tags.map((tag) => {
          return editableThematic && editableThematic.id === recordId ? (
            <Tag key={tag.id}>{tag.word}</Tag>
          ) : (
            <Popconfirm
              title={`Удалить тег ${tag.word}?`}
              key={tag.id}
              onConfirm={() =>
                onDeleteWord({ field, recordId, word: tag.word })}
            >
              <Tag closable onClose={e => e.preventDefault()}>
                {tag.word}
              </Tag>
            </Popconfirm>
          );
        })}
      {editableCell !== null &&
      editableCell.field === field &&
      editableCell.recordId === recordId ? (
        <Input
          autoFocus
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
          styleName="add-button"
          onClick={() => onAddWord({ field, recordId })}
          disabled={editableThematic && editableThematic.id === recordId}
        >
          + Добавить
        </Button>
      )}
    </span>
  );
}

export default compose(
  withHandlers({
    handleCellChange: ({ onChangeEditableThematic, editableThematic }) => (
      field,
      index,
      value,
    ) => onChangeEditableThematic({ ...editableThematic, [field]: value }),
    handleEdit: ({ onChangeEditableThematic }) => record =>
      onChangeEditableThematic(record),
    handleCancel: ({ onChangeEditableThematic }) => () =>
      onChangeEditableThematic(null),
  }),
  pure,
)(ModelThematics);
