import React from 'react';
import { shape, string, number, bool, arrayOf, func } from 'prop-types';
import { Card, Button, Input, Table } from 'antd';
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
};

Authors.propTypes = {
  data: arrayOf(recordShape),
};

function Authors({ data }) {
  return (
    <Card
      title={
        <span>
          <Button.Group>
            <Button type="primary" icon="plus">
              Добавить
            </Button>
            <Button type="primary" icon="minus">
              Удалить
            </Button>
            <Button type="primary" icon="retweet">
              Обновить
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
              renderCell(index, 'accountName', record),
          },
          {
            title: 'Социальная сеть',
            sorter: (a, b) => a.name.localeCompare(b.name),
            render: (text, record, index) =>
              renderCell(index, 'socialNetwork', record),
          },
          {
            title: 'Количество подписчиков',
            sorter: (a, b) => a.name.localeCompare(b.name),
            render: (text, record, index) =>
              renderCell(index, 'subscribersNumber', record),
          },
          {
            title: 'Комментарий',
            sorter: (a, b) => a.name.localeCompare(b.name),
            render: (text, record, index) =>
              renderCell(index, 'comment', record),
          },
          {
            title: 'Выбрать',
            sorter: (a, b) => a.name.localeCompare(b.name),
            render: (text, record, index) => renderCell(index, 'name', record),
          },
        ]}
      />
    </Card>
  );
}

function renderCell(index, field, record) {
  const isEditableCell = record.id;
  return path(field.split('.'), record);
}
export default compose(pure)(Authors);
