import React from 'react';
import { compose, pure, withState, withHandlers } from 'recompose';
import moment from 'moment';
import { Card, Table, Tabs, Button, DatePicker, Input, Modal } from 'antd';
import { arrayOf, object, func, bool } from 'prop-types';
import './index.less';

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

const staff = [
  {
    dep_code: '12345',
    dep_name: 'ДОС ПИЗ',
    employee_number: '444333',
    employee_fullname: 'Игорев Пётр Сидорович',
  },
  {
    dep_code: '12345',
    dep_name: 'ДОС ПИЗ',
    employee_number: '444332',
    employee_fullname: 'Игорев Пётр Дидорович',
  },
  {
    dep_code: '12345',
    dep_name: 'ДОС ПИЗ',
    employee_number: '444331',
    employee_fullname: 'Игорев Пётр Гидрович',
  },
];

const typeMeasures = [
  { measure_id: '1234', measure_type: 'апельсины убрать' },
  { measure_id: '1235', measure_type: 'гнуть свою линию' },
];

const Column = Table.Column;

MassMeasures.propTypes = {
  measures: arrayOf(object),
  selectedMeasure: object,
  onMeasureClick: func.isRequired,
  usersModalOpened: bool,
  openUsersModal: func.isRequired,
  closeUsersModal: func.isRequired,
  openMeasuresModal: func.isRequired,
  closeMeasuresModal: func.isRequired,
  measuresModalOpened: bool,
};

MassMeasures.defaultProps = {
  measures: [],
  selectedMeasure: null,
  usersModalOpened: false,
  measuresModalOpened: false,
};

function MassMeasures({
  measures,
  selectedMeasure,
  onMeasureClick,

  usersModalOpened,
  openUsersModal,
  closeUsersModal,

  measuresModalOpened,
  openMeasuresModal,
  closeMeasuresModal,
}) {
  return (
    <section>
      <Card>
        <Table
          onRowClick={record => onMeasureClick(record)}
          dataSource={measures.map(item => ({ ...item, key: item.id }))}
          pagination={false}
          title={() => (
            <Input.Search
              styleName="search"
              placeholder="Поиск по ID сегмента, названию сегмента или СПП"
              onSearch={value => console.log(value)}
            />
          )}
        >
          <Column
            styleName="cell"
            title="ID"
            dataIndex="id"
            sorter={(a, b) => a.id.localeCompare(b.id)}
            render={(text, record, index) =>
              renderMeasure(text, record, index, selectedMeasure)}
          />
          <Column
            styleName="cell"
            title="Название сегмента"
            dataIndex="segment_name"
            sorter={(a, b) => a.segment_name.localeCompare(b.segment_name)}
            render={(text, record, index) =>
              renderMeasure(text, record, index, selectedMeasure)}
          />
          <Column
            styleName="cell"
            title="Описание сегмента"
            dataIndex="segment_description"
            sorter={(a, b) =>
              a.segment_description.localeCompare(b.segment_description)}
            render={(text, record, index) =>
              renderMeasure(text, record, index, selectedMeasure)}
          />
          <Column
            styleName="cell"
            title="СПП"
            dataIndex="spp"
            sorter={(a, b) => a.spp.localeCompare(b.spp)}
            render={(text, record, index) =>
              renderMeasure(text, record, index, selectedMeasure)}
          />
          <Column
            styleName="cell"
            title="Статус"
            dataIndex="status"
            sorter={(a, b) => a.status.localeCompare(b.status)}
            render={(text, record, index) =>
              renderMeasure(text, record, index, selectedMeasure)}
          />

          <Column
            styleName="cell"
            title="Плановая дата"
            dataIndex="date"
            sorter={(a, b) => a.date.localeCompare(b.date)}
            render={(text, record, index) =>
              renderMeasure(text, record, index, selectedMeasure)}
          />
          <Column
            styleName="cell"
            title="Дата ввода мер"
            dataIndex="date_measures"
            sorter={(a, b) => a.date_measures.localeCompare(b.date_measures)}
            render={(text, record, index) =>
              renderMeasure(text, record, index, selectedMeasure, true)}
          />
        </Table>
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
                  render: text =>
                    renderCellWithButton(
                      text,
                      <Button
                        icon="solution"
                        size="small"
                        onClick={() => openMeasuresModal()}
                      />,
                    ),
                },
                {
                  title: 'ФИО сотрудника',
                  dataIndex: 'employee_name',
                  sorter: (a, b) =>
                    a.employee_name.localeCompare(b.employee_name),
                  render: text =>
                    renderCellWithButton(
                      text,
                      <Button
                        icon="solution"
                        size="small"
                        onClick={() => openUsersModal()}
                      />,
                    ),
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
      {usersModalOpened && (
        <Modal
          visible={usersModalOpened}
          maskClosable={false}
          onOk={() => closeUsersModal()}
          onCancel={() => closeUsersModal()}
          width="90%"
          title={
            <div>
              <span>Выбор сотрудника</span>
              <Input.Search
                styleName="title-search"
                placeholder="Поиск по коду подразделения, наименованию подразделения, табельному номеру или ФИО"
                onSearch={value => console.log(value)}
              />
            </div>
          }
          okText="Изменить"
        >
          <Table
            dataSource={staff}
            pagination={false}
            rowSelection
            columns={[
              {
                title: 'Код подразделения',
                dataIndex: 'dep_code',
                sorter: (a, b) => a.dep_code - b.dep_code,
              },
              {
                title: 'Подразделение',
                dataIndex: 'dep_name',
                sorter: (a, b) => a.dep_name.localeCompare(b.dep_name),
              },
              {
                title: 'Табельный номер',
                dataIndex: 'employee_number',
                sorter: (a, b) => a.employee_number - b.employee_number,
              },
              {
                title: 'ФИО сотрудника',
                dataIndex: 'employee_fullname',
                sorter: (a, b) =>
                  a.employee_fullname.localeCompare(b.employee_fullname),
              },
            ]}
          />
        </Modal>
      )}
      {measuresModalOpened && (
        <Modal
          maskClosable={false}
          visible={measuresModalOpened}
          onOk={() => closeMeasuresModal()}
          onCancel={() => closeMeasuresModal()}
          width="90%"
          title={
            <div>
              <span>Выбор типовой меры</span>
              <Input.Search
                styleName="title-search"
                placeholder="Поиск по коду меры или названию типовой меры"
                onSearch={value => console.log(value)}
              />
            </div>
          }
          okText="Изменить"
        >
          <Table
            dataSource={typeMeasures}
            pagination={false}
            rowSelection
            columns={[
              {
                title: 'Код меры',
                dataIndex: 'measure_id',
                sorter: (a, b) => a.dep_code - b.dep_code,
              },
              {
                title: 'Типовая мера',
                dataIndex: 'measure_type',
                sorter: (a, b) => a.dep_name.localeCompare(b.dep_name),
              },
            ]}
          />
        </Modal>
      )}
    </section>
  );
}

function renderCellWithButton(text, button) {
  return (
    <div styleName="cell-button-wrapper">
      <span>{text}</span>
      <div>{button}</div>
    </div>
  );
}

function renderMeasure(text, record, index, selected, isLast) {
  let style = 'cell-inner';
  if (selected && record.id === selected.id) {
    if (isLast) style = 'cell-inner-selected-last';
    else style = 'cell-inner-selected';
  }
  return <span styleName={style}>{text}</span>;
}

export default compose(
  withState('usersModalOpened', 'setUsersModalOpened', false),
  withHandlers({
    openUsersModal: ({ setUsersModalOpened }) => () => {
      setUsersModalOpened(true);
    },
    closeUsersModal: ({ setUsersModalOpened }) => () => {
      setUsersModalOpened(false);
    },
  }),
  withState('measuresModalOpened', 'setMeasuresModalOpened', false),
  withHandlers({
    openMeasuresModal: ({ setMeasuresModalOpened }) => () => {
      setMeasuresModalOpened(true);
    },
    closeMeasuresModal: ({ setMeasuresModalOpened }) => () => {
      setMeasuresModalOpened(false);
    },
  }),
  pure,
)(MassMeasures);
