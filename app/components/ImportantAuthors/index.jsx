import React from 'react';
import { shape, string, number, arrayOf, func } from 'prop-types';
import { Card, Button, Input, Table, Select, Popconfirm, Modal } from 'antd';
import { compose, pure, withHandlers } from 'recompose';
import { path } from 'ramda';
import EditableCell from '../ui/Table/EditableCell';
import './index.less';

const recordShape = shape({
  id: number,
  accountName: string,
  socialNetwork: string,
  subscribersNumber: number,
  comment: string,
});

Authors.defaultProps = {
  data: [],
  editableRecord: null,
};

Authors.propTypes = {
  /* eslint react/no-unused-prop-types: 0 */
  onAdd: func.isRequired,
  data: arrayOf(recordShape),
  onChangeEditableRecord: func.isRequired,
  editableRecord: recordShape,
  handleEdit: func.isRequired,
  onDelete: func.isRequired,
  onSave: func.isRequired,
  handleCancel: func.isRequired,
  handleCellChange: func.isRequired,
  
};

function Authors({
  data,
  editableRecord,
  onAdd,
  handleEdit,
  onDelete,
  onSave,
  handleCancel,
  handleCellChange,
}) {
  return (
    <Card
      title={
        <span>
          <Button.Group>
            <Button
              type="primary"
              icon="plus"
              disabled={editableRecord !== null}
              onClick={onAdd}
            >
              Добавить
            </Button>
          </Button.Group>
        </span>
      }
      extra={<Input.Search placeholder="Поиск" />}
    >
      <Table
        dataSource={data.map(item => ({ ...item, key: item.id }))}
        pagination={false}
        styleName="table"
        columns={[
          {
            title: 'Наименование аккаунта',
            sorter: (a, b) => a.name.localeCompare(b.name),
            render: (text, record, index) =>
              renderCell(
                index,
                'accountName',
                record,
                editableRecord,
                handleCellChange,
              ),
          },
          {
            title: 'Социальная сеть',
            dataIndex: 'socialNetwork',
            render: (text, record) => renderSelect(text, record),
          },
          {
            title: 'Количество подписчиков',
            sorter: (a, b) => a.name.localeCompare(b.name),
            dataIndex: 'subscribersNumber',
          },
          {
            title: 'Комментарий',
            sorter: (a, b) => a.name.localeCompare(b.name),
            dataIndex: 'comment',
          },
          {
            title: '',
            key: 'operation',
            width: '120px',
            fixed: 'right',

            render: (text, record) => {
              return (
                <span styleName="action-button-wrapper">
                  {editableRecord && editableRecord.id === record.id ? (
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
                        disabled={editableRecord !== null}
                        onClick={() => handleEdit(record)}
                      />
                    </span>
                  )}
                  <span className="ant-divider" />
                  <Button
                    icon="delete"
                    onClick={() =>
                      Modal.confirm({
                        title: 'Удалить пользователя?',
                        content: `Вы уверены, что хотите удалить пользователя  ${record.name}?`,
                        iconType: 'exclamation-circle',
                        onOk: () => Promise.resolve(onDelete(record)),
                      })}
                  />
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
export default compose(
  withHandlers({
    handleCellChange: ({ onChangeEditableRecord, editableRecord }) => (
      field,
      index,
      value,
    ) => onChangeEditableRecord({ ...editableRecord, [field]: value }),
    handleEdit: ({ onChangeEditableRecord }) => record =>
      onChangeEditableRecord(record),
    handleCancel: ({ onChangeEditableRecord }) => () =>
      onChangeEditableRecord(null),
  }),
  pure,
)(Authors);

function renderSelect(text, record, onPermissionChange) {
  return (
    <Select
      value={text}
      styleName="select"
      onChange={value =>
        onPermissionChange({ value, functional: record.functional })}
    >
      <Select.Option value="0" key="0">
        Выбрать
      </Select.Option>
      <Select.Option value="1" key="1">
        Facebook
      </Select.Option>
      <Select.Option value="2" key="2">
        Twitter
      </Select.Option>
      <Select.Option value="3" key="3">
        Instagram
      </Select.Option>
    </Select>
  );
}
