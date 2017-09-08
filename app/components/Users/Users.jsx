import React from 'react';
import { number, arrayOf, shape, object, func, string } from 'prop-types';
import { compose, pure, withHandlers } from 'recompose';
import { Input, Card, Button, Modal, Popconfirm, Table } from 'antd';
import { path } from 'ramda';
import EditableCell from '../ui/Table/EditableCell';
import './Users.less';

const recordShape = shape({
  id: number,
  name: string,
  login: string,
  position: string,
  email: string,
  userRole: object,
});

Users.propTypes = {
  editableUserRecord: recordShape,
  data: arrayOf(recordShape),
  onChangeEditableRecord: func.isRequired, /* eslint react/no-unused-prop-types: 0 */
  onSave: func.isRequired,
  onAdd: func.isRequired,
  onDelete: func.isRequired,
  handleEdit: func.isRequired,
  handleCellChange: func.isRequired,
  handleCancel: func.isRequired,
};

Users.defaultProps = {
  data: [],
  editableUserRecord: null,
};

function Users({
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
      title={
        <Button
          type="primary"
          icon="plus"
          disabled={editableUserRecord !== null}
          onClick={onAdd}
        >
          Добавить
        </Button>
      }
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
            title: 'ФИО',
            sorter: (a, b) => a.name.localeCompare(b.name),
            render: (text, record, index) =>
              renderCell(index, 'name', record, editableUserRecord, handleCellChange),
          },
          {
            title: 'Логин',
            width: '12%',
            sorter: (a, b) => a.login.localeCompare(b.login),
            render: (text, record, index) =>
              renderCell(index, 'login', record, editableUserRecord, handleCellChange),
          },
          {
            title: 'Должность',
            width: '17%',
            sorter: (a, b) => a.position.localeCompare(b.position),
            render: (text, record, index) =>
              renderCell(
                index,
                'position',
                record,
                editableUserRecord,
                handleCellChange,
              ),
          },
          {
            title: 'E-mail',
            width: '17%',
            sorter: (a, b) => a.mail.localeCompare(b.mail),
            render: (text, record, index) =>
              renderCell(index, 'email', record, editableUserRecord, handleCellChange),
          },
          {
            title: 'Роль',
            width: '12%',
            sorter: (a, b) => a.role.localeCompare(b.role),
            render: (text, record, index) =>
              renderCell(index, 'userRole', record, editableUserRecord, handleCellChange),
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

function renderCell(index, field, record, editableUserRecord, handleCellChange) {
  const isEditableCell = editableUserRecord !== null && editableUserRecord.id === record.id;

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
    handleCellChange: ({ onChangeEditableRecord, editableUserRecord }) => (field, index, value) =>
      onChangeEditableRecord({ ...editableUserRecord, [field]: value }),
    handleEdit: ({ onChangeEditableRecord }) => record => onChangeEditableRecord(record),
    handleCancel: ({ onChangeEditableRecord }) => () => onChangeEditableRecord(null),
  }),
  pure,
)(Users);
