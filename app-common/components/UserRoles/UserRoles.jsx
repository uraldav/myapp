import React from 'react';
import { number, arrayOf, shape, object, func, string, bool } from 'prop-types';
import { compose, pure } from 'recompose';
import { Card, Table, Select, Row, Col, Button, Modal, Icon } from 'antd';
import EditableCell from '../ui/Table/EditableCell';
import './UserRoles.less';

const Column = Table.Column;

UserRoles.propTypes = {
  userPermissions: arrayOf(object),
  roles: arrayOf(object),
  editableRecord: object,
  onUserRoleClick: func.isRequired,
  onUserPermissionChange: func.isRequired,
  onUserRoleDelete: func.isRequired,
  onUserRoleAdd: func.isRequired,
  onUserRoleSave: func.isRequired,
  onUserRoleRename: func.isRequired,
  isEditing: bool,
  permissions: shape({ userRolesView: bool, userRolesEdit: bool }),
};

UserRoles.defaultProps = {
  userPermissions: [],
  roles: [],
  editableRecord: null,
  isEditing: false,
  permissions: null,
};

function UserRoles({
  userPermissions,
  roles,
  editableRecord,
  onUserRoleClick,
  onUserPermissionChange,
  onUserRoleDelete,
  onUserRoleAdd,
  isEditing,
  onUserRoleSave,
  onUserRoleRename,
  permissions,
}) {
  return permissions.userRolesView ? (
    <Card>
      <Row>
        <Col span={8}>
          <div styleName="top-buttons">
            <Button
              type="primary"
              icon="plus"
              onClick={() => onUserRoleAdd()}
              disabled={!permissions.userRolesEdit}
            >
              Добавить
            </Button>
            <Button
              disabled={!permissions.userRolesEdit}
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
            dataSource={userPermissions.map((item, idx) => ({
              ...item,
              key: idx,
            }))}
            columns={[
              { title: 'Функция', dataIndex: 'name' },
              {
                title: 'Уровень доступа',
                dataIndex: 'value',
                render: (text, record) =>
                  renderSelect(text.toString(), record, onUserPermissionChange, permissions),
              },
            ]}
          />
        </Col>
      </Row>
    </Card>
  ) : (
    <Card>Доступ к данному справочнику ограничен.</Card>
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

function renderSelect(text, record, onUserPermissionChange, permissions) {
  return (
    <Select
      disabled={!permissions.userRolesEdit}
      value={text}
      styleName="select"
      onChange={value =>
        onUserPermissionChange({ value, functional: record.functional })}
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
