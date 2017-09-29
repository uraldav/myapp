import React from 'react';
import { path } from 'ramda';
import { Icon, Tag, Button, Input, Popconfirm } from 'antd';
import EditableCell from '../components/ui/Table/EditableCell';
import '../components/ui/Table/tableWithTags.less';

export default function renderCell(
  index,
  field,
  record,
  editableRecord,
  handleCellChange,
  autoFocus,
) {
  const isEditableCell =
    editableRecord !== null && editableRecord.id === record.id;

  if (isEditableCell) {
    return (
      <EditableCell
        autoFocus={autoFocus}
        editable
        value={path(field.split('.'), editableRecord)}
        onChange={value => handleCellChange(field, index, value)}
      />
    );
  }
  return path(field.split('.'), record);
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
  permissions,
) {
  return (
    <span styleName="tags-cell">
      {tags &&
        tags.map((tag) => {
          return (!permissions.thematicsEdit || (editableThematic && editableThematic.id === recordId)) ? (
            <Tag key={tag.id}>{tag.word}</Tag>
          ) : (
            <Tag styleName="tag" key={tag.id}>
              {tag.word}&nbsp;&nbsp;
              <Popconfirm
                title={`Удалить тег ${tag.word}?`}
                onConfirm={() =>
                  onDeleteWord({ field, recordId, word: tag.word })}
              >
                <Icon type="close" />
              </Popconfirm>
            </Tag>
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
          disabled={!permissions.thematicsEdit || (editableThematic && editableThematic.id === recordId)}
        >
          + Добавить
        </Button>
      )}
    </span>
  );
}

