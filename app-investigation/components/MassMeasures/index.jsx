import React from 'react';
import { compose, pure } from 'recompose';
import moment from 'moment';
import { Card, Table, Tabs, Button, DatePicker } from 'antd';
import './index.less';

const dataMock = [
  {
    id: '123',
    segment_name: 'Мандарины убрать',
    segment_description: 'Негативные отзывы по питанию (мандарины)',
    spp: 'ДУКП ОСС',
    status: 'Выполнено',
    date: '27.12.2017',
    date_measures: '28.12.2017',
  },
];

const dateFormat = 'DD.MM.YYYY';

const measuresMock = [
  {
    measure: 'Убирание еды',
    employee_name: 'Фёдор Петро',
    tabel_number: '123456',
    date: '21.5.2012',
    date_measures: '2.2.2013',
    commentary: 'Doods',
  },
];

function MassMeasures() {
  return (
    <section>
      <Card>
        <Table
          dataSource={dataMock.map(item => ({ ...item, key: item.id }))}
          pagination={false}
          columns={[
            {
              title: 'ID',
              dataIndex: 'id',
              sorter: (a, b) => a.id.localeCompare(b.id),
            },
            {
              title: 'Название сегмента',
              dataIndex: 'segment_name',
              sorter: (a, b) => a.segment_name.localeCompare(b.segment_name),
            },
            {
              title: 'Название сегмента',
              dataIndex: 'segment_description',
              sorter: (a, b) =>
                a.segment_description.localeCompare(b.segment_description),
            },
            {
              title: 'СПП',
              dataIndex: 'spp',
              sorter: (a, b) => a.spp.localeCompare(b.spp),
            },
            {
              title: 'Статус',
              dataIndex: 'status',
              sorter: (a, b) => a.status.localeCompare(b.status),
            },
            {
              title: 'Плановая дата',
              dataIndex: 'date',
              sorter: (a, b) => a.date.localeCompare(b.date),
            },
            {
              title: 'Дата ввода мер',
              dataIndex: 'date_measures',
              sorter: (a, b) => a.date_measures.localeCompare(b.date_measures),
            },
          ]}
        />
        <Tabs type="card" styleName="tabs">
          <Tabs.TabPane tab="Меры" key="1">
            <Table
              dataSource={measuresMock.map(item => ({ ...item, key: item.id }))}
              pagination={false}
              title={() => (
                <Button type="primary" icon="plus">
                  Добавить
                </Button>
              )}
              columns={[
                {
                  title: 'Типовая мера',
                  dataIndex: 'measure',
                  sorter: (a, b) => a.measure.localeCompare(b.measure),
                },
                {
                  title: 'ФИО сотрудника',
                  dataIndex: 'employee_name',
                  sorter: (a, b) =>
                    a.employee_name.localeCompare(b.employee_name),
                },
                {
                  title: 'Табельный номер',
                  dataIndex: 'tabel_number',
                  sorter: (a, b) =>
                    a.tabel_number.localeCompare(b.tabel_number),
                },
                {
                  title: 'Плановая дата принятия мер',
                  dataIndex: 'date',
                  sorter: (a, b) => a.date.localeCompare(b.date),
                  render: text => (
                    <DatePicker
                      defaultValue={moment(text, dateFormat)}
                      format={dateFormat}
                      allowClear={false}
                    />
                  ),
                },
                {
                  title: 'Дата ввода меры',
                  dataIndex: 'date_measures',
                  sorter: (a, b) =>
                    a.date_measures.localeCompare(b.date_measures),
                },
                {
                  title: 'Комментарий',
                  dataIndex: 'commentary',
                  sorter: (a, b) => a.commentary.localeCompare(b.commentary),
                },
              ]}
            />
          </Tabs.TabPane>
        </Tabs>
      </Card>
    </section>
  );
}

export default compose(pure)(MassMeasures);
