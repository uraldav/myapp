import React from 'react';
import { number, arrayOf, shape, object, func, string } from 'prop-types';
import { compose, pure } from 'recompose';
import { Card, Table, Select, Row, Col } from 'antd';
import './UserRoles.less';

const Column = Table.Column;

UserRoles.propTypes = {
  permissions: arrayOf(object),
  roles: arrayOf(object),
  editableRecord: object,
  onUserRoleClick: func.isRequired,
};

UserRoles.defaultProps = {
  permissions: [],
  roles: [],
  editableRecord: null,
};

function UserRoles({
  permissions,
  roles,
  editableRecord,
  onUserRoleClick,
}) {
  return (
    <Card>
      <Row>
        <Col span={8}>
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
                renderUserRole(text, record, index, editableRecord)}
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
                render: (text, record, index) => renderSelect(text.toString()),
              },
            ]}
          />
        </Col>
      </Row>
    </Card>
  );
}

function renderUserRole(text, record, index, editableRecord) {
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
      {text}
    </span>
  );
}

function renderSelect(text) {
  return (
    <Select value={text} styleName="select">
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
