import React from 'react';
import { number, arrayOf, shape, object, func, string, bool } from 'prop-types';
import { compose, pure } from 'recompose';
import { Card, Table, Select, Row, Col, Button, Modal, Icon } from 'antd';
import EditableCell from '../ui/Table/EditableCell';
import './UserRoles.less';

const Column = Table.Column;

UserRoles.propTypes = {
  permissions: arrayOf(object),
  roles: arrayOf(object),
  editableRecord: object,
  onUserRoleClick: func.isRequired,
  onPermissionChange: func.isRequired,
  onUserRoleDelete: func.isRequired,
  onUserRoleAdd: func.isRequired,
  onUserRoleSave: func.isRequired,
  onUserRoleRename: func.isRequired,
  isEditing: bool,
};

UserRoles.defaultProps = {
  permissions: [],
  roles: [],
  editableRecord: null,
  isEditing: false,
};

function UserRoles({
  permissions,
  roles,
  editableRecord,
  onUserRoleClick,
  onPermissionChange,
  onUserRoleDelete,
  onUserRoleAdd,
  isEditing,
  onUserRoleSave,
  onUserRoleRename,
}) {
  return (
    <Card>
      <Row>
        <Col span={8}>
          <div styleName="top-buttons">
            <Button type="primary" icon="plus" onClick={() => onUserRoleAdd()}>
              Добавить
            </Button>
            <Button
              type="danger"
              icon="minus"
              onClick={() =>
                Modal.confirm({
                  title: 'Удалить роль пользователя?',
                  content: `Вы уверены, что хотите удалить роль пользователя  ${editableRecord.role_name}?`,
                  iconType: 'exclamation-circle',
                  onOk: () => Promise.resolve(onUserRoleDelete()),
                })}
            >
              Удалить
            </Button>
          </div>
          <Table
            size="medium"
            showHeader={false}
            bordered
            pagination={false}
            onRowClick={record => onUserRoleClick(record)}
            dataSource={roles.map(item => ({ ...item, key: item.id }))}
          >
            <Column
              styleName="cell"
              dataIndex="role_name"
              render={(text, record, index) =>
                renderUserRole(
                  text,
                  record,
                  index,
                  editableRecord,
                  isEditing,
                  onUserRoleSave,
                  onUserRoleRename,
                )}
            />
          </Table>
        </Col>
        <Col span={16}>
          <Table
            bordered
            pagination={false}
            dataSource={permissions.map((item, idx) => ({ ...item, key: idx }))}
            columns={[
              { title: 'Функция', dataIndex: 'name' },
              {
                title: 'Уровень доступа',
                dataIndex: 'value',
                render: (text, record) =>
                  renderSelect(text.toString(), record, onPermissionChange),
              },
            ]}
          />
        </Col>
      </Row>
    </Card>
  );
}

function renderUserRole(
  text,
  record,
  index,
  editableRecord,
  isEditing,
  onUserRoleSave,
  onUserRoleRename,
) {
  return (
    <span
      styleName={
        editableRecord && record.id === editableRecord.id ? (
          'cell-inner-selected'
        ) : (
          'cell-inner'
        )
      }
    >
      <EditableCell
        value={text}
        autoFocus
        editable={isEditing && record.id === editableRecord.id}
        onChange={value => onUserRoleRename({ role_name: value })}
      >
        <Icon type="save" onClick={() => onUserRoleSave()} />
      </EditableCell>
    </span>
  );
}

function renderSelect(text, record, onPermissionChange) {
  return (
    <Select
      value={text}
      styleName="select"
      onChange={value =>
        onPermissionChange({ value, functional: record.functional })}
    >
      <Select.Option value="0" key="0">
        Недоступно
      </Select.Option>
      <Select.Option value="1" key="1">
        Просмотр
      </Select.Option>
      <Select.Option value="2" key="2">
        Изменение
      </Select.Option>
    </Select>
  );
}

export default compose(pure)(UserRoles);
