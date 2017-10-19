import React from 'react';
import { compose, pure, withState, withHandlers } from 'recompose';
import { Card, Table, Button, Modal, Select } from 'antd';
import { renderCell } from 'app-common/utils/tableRender';
import { arrayOf, object, func, bool } from 'prop-types';
import './index.less';

const Popconfirm = Modal.Popconfirm;

const data = [
  {
    id: 1,
    dep_code: 50000584,
    dep_name: 'ДНОП',
    email: 'dnop@aeroflot.ru',
    routing: 2,
  },
  {
    id: 2,
    dep_code: 50000587,
    dep_name: 'Отдел организации пассажирских перевозок',
    email: 'oop-dnop@aeroflot.ru',
    routing: 1,
  },
];

const deps = [
  { name: 'ДНОП', code: 50000584 },
  { name: 'Отдел организации пассажирских перевозок', code: 50000587 },
  { name: 'ДОС ПИЗ', code: 50000589 },
];

let editableDepartmentRecord = null;

const onDepChange = () => {};
const onDelete = () => {};
const onSave = () => {};
const handleCancel = () => {};

const handleEdit = (record) => {
  editableDepartmentRecord = record;
};

const handleCellChange = () => {};
const onRouteChange = () => {};
const onAdd = () => {};

function Departments() {
  return (
    <Card
      title={
        <Button
          type="primary"
          icon="plus"
          disabled={editableDepartmentRecord !== null}
          onClick={onAdd}
        >
          Добавить
        </Button>
      }
    >
      <Table
        dataSource={data.map(item => ({ ...item, key: item.dep_code }))}
        pagination={false}
        columns={[
          {
            title: 'Код подразделения',
            sorter: (a, b) => a.dep_code - b.dep_code,
            dataIndex: 'dep_code',
          },
          {
            title: 'Наименование подразделения',
            sorter: (a, b) => a.dep_name.localeCompare(b.dep_name),
            dataIndex: 'dep_name',
            render: (text, record) =>
              renderDepartmentSelect(
                text.toString(),
                record,
                deps,
                onDepChange,
                editableDepartmentRecord,
              ),
          },
          {
            title: 'e-mail для уведомлений',
            sorter: (a, b) => a.email.localeCompare(b.email),
            render: (text, record, index) =>
              renderCell(
                index,
                'email',
                record,
                editableDepartmentRecord,
                handleCellChange,
                false,
              ),
          },
          {
            title: 'ИС для маршрутизации',
            sorter: (a, b) => a.routing - b.routing,
            dataIndex: 'routing',
            render: (text, record) =>
              renderSelect(
                text.toString(),
                record,
                onRouteChange,
                editableDepartmentRecord,
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
                  {editableDepartmentRecord &&
                  editableDepartmentRecord.id === record.id ? (
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
                        disabled={editableDepartmentRecord !== null}
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
                        content: `Вы уверены, что хотите удалить подразделение ${record.dep_name}?`,
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

function renderDepartmentSelect(
  text,
  record,
  departments,
  onChange,
  editableRecord,
) {
  return editableRecord && editableRecord.id === record.id ? (
    <Select
      showSearch
      filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
      value={text}
      styleName="select"
      onChange={value => onChange({ value, routing: record.routing })}
    >
      {departments.map(dep => (
        <Select.Option value={dep.code} key={dep.code}>
          {dep.name}
        </Select.Option>
      ))}
    </Select>
  ) : (
    <span>{text}</span>
  );
}

function renderSelect(text, record, onChange, editableRecord) {
  return editableRecord && editableRecord.id === record.id ? (
    <Select
      value={text}
      styleName="select"
      onChange={value => onChange({ value, routing: record.routing })}
    >
      <Select.Option value="0" key="0">
        {getRoutingName(0)}
      </Select.Option>
      <Select.Option value="1" key="1">
        {getRoutingName(1)}
      </Select.Option>
      <Select.Option value="2" key="2">
        {getRoutingName(2)}
      </Select.Option>
    </Select>
  ) : (
    <span>{getRoutingName(Number(text))}</span>
  );
}

function getRoutingName(value) {
  if (value === 1) return 'АРМ Расследования';
  if (value === 2) return 'CRM Siebel';
  return 'Деактивировано';
}

export default compose(pure)(Departments);
