import React from 'react';
import { shape, string, number, bool, arrayOf, func } from 'prop-types';
import { Card, Button, Input, Table } from 'antd';
import './index.less';

const recordShape = shape({
  accountName: string,
  socialNetwork: number,
  subscribersNumber: number,
  comment: string,
  selected: bool,
});

Authors.defaultProps = {
  data: [],
};

Authors.propTypes = {
  data: arrayOf(recordShape),
  onAdd: func.isRequired,
  onDelete: func.isRequired,
};

function Authors({ data, onAdd, onDelete }) {
  return (
    <Card
      title={
        <Button type="primary" icon="plus" onclick={onAdd}>
          Добавить
        </Button>
      }

      extra={
        <Input.Search
          placeholder="Поиск"
        />
      }
    >
    <Table
      dataSource={data.map(item=>({...item=>({...item, key: item.id})}))}
      pagination={false}
      styleName="table"
      columns{[
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
              ), 
        }
      ]}
      />
      </Card>
  );
}
