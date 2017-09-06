import React from 'react';
import { func, bool, node, object } from 'prop-types';
import { compose, pure, withHandlers, withState } from 'recompose';
import { Icon, Table, Modal, Button } from 'antd';
import FaIcon from 'react-fontawesome';
import EditableTable from './Table/EditableTable';
import './Users.less';

const columns = [
  {
    title: 'ФИО',
    dataIndex: 'name',
    key: 'name',
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  {
    title: 'Логин',
    dataIndex: 'login',
    key: 'login',
    sorter: (a, b) => a.login.localeCompare(b.login),
  },
  {
    title: 'Должность',
    dataIndex: 'position',
    key: 'position',
    sorter: (a, b) => a.position.localeCompare(b.position),
  },
  {
    title: 'E-mail',
    dataIndex: 'mail',
    key: 'mail',
    sorter: (a, b) => a.mail.localeCompare(b.mail),
  },
  {
    title: 'Роль',
    dataIndex: 'role',
    key: 'role',
    sorter: (a, b) => a.role.localeCompare(b.role),
  },
  {
    title: '',
    key: 'operation',
    fixed: 'right',
    width: 100,
    render: (text, record) => (
      <span>
        <Button shape="circle" icon="edit" />
        <span className="ant-divider" />
        <Button
          shape="circle"
          icon="delete"
          onClick={() =>
            Modal.confirm({
              title: 'Удалить пользователя?',
              content: `Вы уверены, что хотите удалить пользователя  ${record.name}?`,
              iconType: 'exclamation-circle',
            })}
        />
      </span>
    ),
  },
];

const dataSource = [
  {
    key: '1',
    name: 'Александров Александр Александрович',
    login: 'aaa',
    position: 'Специалист ДОС',
    mail: 'aaa@aeroflot.ru',
    role: 'Сотрудник',
  },
  {
    key: '2',
    name: 'Борисов Борис Борисович',
    login: 'bbb',
    position: 'Профи ДОС',
    mail: 'bbb@aeroflot.ru',
    role: 'Сотрудник',
  },
  {
    key: '3',
    name: 'Сидоров Сидор Сидорович',
    login: 'ccc',
    position: 'Профи ДОС',
    mail: 'ссс@aeroflot.ru',
    role: 'Сотрудник',
  },
  {
    key: '4',
    name: 'Довлатов Довлат Довалтович',
    login: 'ddd',
    position: 'Грандмастер ДОС',
    mail: 'ddd@aeroflot.ru',
    role: 'Сотрудник',
  },
];

function Users() {
  return (
    <div styleName="wrapper">
      <Table dataSource={dataSource} columns={columns} pagination={false} />
      <EditableTable data={dataSource1} />
    </div>
  );
}

export default compose(pure)(Users);

const dataSource1 = [
  {
    key: '1',
    name: { value: 'Александров Александр Александрович', editable: false },
    login: { value: 'aaa', editable: false },
    position: { value: 'Специалист ДОС', editable: false },
    mail: { value: 'aaa@aeroflot.ru', editable: false },
    role: { value: 'Сотрудник', editable: false },
  },
  {
    key: '2',
    name: { value: 'Борисов Борис Борисович', editable: false },
    login: { value: 'bbb', editable: false },
    position: { value: 'Профи ДОС', editable: false },
    mail: { value: 'bbb@aeroflot.ru', editable: false },
    role: { value: 'Сотрудник', editable: false },
  },
];
