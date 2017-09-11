import React from 'react';
import { number, arrayOf, shape, object, func, string } from 'prop-types';
import { compose, pure, withHandlers } from 'recompose';
import { Input, Card, Button, Modal, Popconfirm, Table } from 'antd';
import { path } from 'ramda';
import EditableCell from '../ui/Table/EditableCell';
import './index.less';

const recordShape = shape({
  id: number,
  metrics: string,
  formulas: number,
  attention: number,
});

PriorityCoefficients.propTypes = {
  editableUserRecord: recordShape,
  data: arrayOf(recordShape),
  onChangeEditableRecord:
    func.isRequired /* eslint react/no-unused-prop-types: 0 */,
  onSave: func.isRequired,
  onAdd: func.isRequired,
  onDelete: func.isRequired,
  handleEdit: func.isRequired,
  handleCellChange: func.isRequired,
  handleCancel: func.isRequired,
};

PriorityCoefficients.defaultProps = {
  data: [],
  editableUserRecord: null,
};

function PriorityCoefficients({
  data,
  editableUserRecord,
  onSave,
  onAdd,
  onDelete,
  handleCancel,
  handleCellChange,
  handleEdit,
}) {
  return (
    <Card
      title=" "
      extra={
        <Input.Search
          placeholder="Поиск"
          onSearch={value => console.log(value)}
        />
      }
    >
      <Table
        dataSource={data.map(item => ({ ...item, key: item.id }))}
        pagination={false}
        styleName="table"
        columns={[
          {
            title: 'Метрика',
            sorter: (a, b) => a.name.localeCompare(b.name),
            render: (text, record, index) =>
              renderCell(
                index,
                'metrics',
                record,
                editableUserRecord,
                handleCellChange,
              ),
          },
          {
            title: 'Для формулы приоритезации',
            width: '20%',
            sorter: (a, b) => a.login.localeCompare(b.login),
            render: (text, record, index) =>
              renderCell(
                index,
                'formulas',
                record,
                editableUserRecord,
                handleCellChange,
              ),
          },
          {
            title: 'Для ленты "Требуют внимания"',
            width: '20%',
            sorter: (a, b) => a.position.localeCompare(b.position),
            render: (text, record, index) =>
              renderCell(
                index,
                'attention',
                record,
                editableUserRecord,
                handleCellChange,
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
                  {editableUserRecord && editableUserRecord.id === record.id ? (
                    <span>
                      <Button.Group>
                        <Button icon="save" onClick={onSave} />
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
                        disabled={editableUserRecord !== null}
                        onClick={() => handleEdit(record)}
                      />
                    </span>
                  )}
                </span>
              );
            },
          },
        ]}
      />
    </Card>
  );
}

function renderCell(
  index,
  field,
  record,
  editableUserRecord,
  handleCellChange,
) {
  const isEditableCell =
    editableUserRecord !== null && editableUserRecord.id === record.id;

  if (isEditableCell) {
    return (
      <EditableCell
        editable
        value={path(field.split('.'), editableUserRecord)}
        onChange={value => handleCellChange(field, index, value)}
      />
    );
  }
  return path(field.split('.'), record);
}

export default compose(
  withHandlers({
    handleCellChange: ({ onChangeEditableRecord, editableUserRecord }) => (
      field,
      index,
      value,
    ) => onChangeEditableRecord({ ...editableUserRecord, [field]: value }),
    handleEdit: ({ onChangeEditableRecord }) => record =>
      onChangeEditableRecord(record),
    handleCancel: ({ onChangeEditableRecord }) => () =>
      onChangeEditableRecord(null),
  }),
  pure,
)(PriorityCoefficients);
