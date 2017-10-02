import React from 'react';
import { number, arrayOf, shape, func, string, bool } from 'prop-types';
import { compose, pure, withHandlers } from 'recompose';
import { Input, Card, Button, Modal, Popconfirm, Table } from 'antd';
import './Users.less';
import { renderCell } from '../../utils/tableRender';

const recordShape = shape({
  id: number,
  name: string,
  login: string,
  position: string,
  email: string,
  userRole: string,
});

Users.propTypes = {
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
  permissions: shape({
    usersView: bool,
    usersEdit: bool,
  }),
};

Users.defaultProps = {
  data: [],
  editableUserRecord: null,
  permissions: null,
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
  permissions,
}) {
  return permissions.usersView ? (
    <Card
      title={
        <Button
          type="primary"
          icon="plus"
          disabled={!permissions.usersEdit || editableUserRecord !== null}
          onClick={onAdd}
        >
          Добавить
        </Button>
      }
      extra={<Input.Search placeholder="Поиск" />}
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
              renderCell(
                index,
                'name',
                record,
                editableUserRecord,
                handleCellChange,
                true,
              ),
          },
          {
            title: 'Логин',
            width: '12%',
            sorter: (a, b) => a.login.localeCompare(b.login),
            render: (text, record, index) =>
              renderCell(
                index,
                'login',
                record,
                editableUserRecord,
                handleCellChange,
                false,
              ),
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
                false,
              ),
          },
          {
            title: 'E-mail',
            width: '17%',
            sorter: (a, b) => a.mail.localeCompare(b.mail),
            render: (text, record, index) =>
              renderCell(
                index,
                'email',
                record,
                editableUserRecord,
                handleCellChange,
                false,
              ),
          },
          {
            title: 'Роль',
            width: '12%',
            sorter: (a, b) => a.role.localeCompare(b.role),
            render: (text, record, index) =>
              renderCell(
                index,
                'userRole',
                record,
                editableUserRecord,
                handleCellChange,
                false,
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
                        <Button
                          icon="save"
                          onClick={onSave}
                          disabled={!permissions.usersEdit}
                        />
                        <Popconfirm
                          title="Отменить изменения?"
                          onConfirm={handleCancel}
                        >
                          <Button
                            icon="close"
                            disabled={!permissions.usersEdit}
                          />
                        </Popconfirm>
                      </Button.Group>
                    </span>
                  ) : (
                    <span>
                      <Button
                        icon="edit"
                        disabled={
                          !permissions.usersEdit || editableUserRecord !== null
                        }
                        onClick={() => handleEdit(record)}
                      />
                    </span>
                  )}
                  <span className="ant-divider" />
                  <Button
                    icon="delete"
                    disabled={!permissions.usersEdit}
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
  ) : (
    <Card>Доступ к данному справочнику ограничен.</Card>
  );
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
)(Users);
