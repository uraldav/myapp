import React from 'react';
import { compose, pure } from 'recompose';
import { Input, Card, Button } from 'antd';
import EditableTable from './Table/EditableTable';
import './Users.less';

const dataSource1 = [
  {
    key: 1,
    name: 'Александров Александр Александрович',
    login: 'aaa',
    position: 'Специалист ДОС',
    mail: 'aaa@aeroflot.ru',
    role: 'Сотрудник',
  },
  {
    key: 2,
    name: 'Борисов Борис Борисович',
    login: 'bbb',
    position: 'Профи ДОС',
    mail: 'bbb@aeroflot.ru',
    role: 'Сотрудник',
  },
];

function Users() {
  return (
    <Card
      title={
        <Button type="primary" icon="plus">Добавить</Button>
      }
      extra={
        <Input.Search
          placeholder="Поиск"
          onSearch={value => console.log(value)}
        />
      }
    >
      <EditableTable
        data={dataSource1}
        onSave={record => console.log(record)}
      />
    </Card>
  );
}

export default compose(pure)(Users);
