import React from 'react';
import { arrayOf, shape, string } from 'prop-types';
import { compose, pure } from 'recompose';
import { Table, Button } from 'antd';
import './MeasureList.less';

MeasureList.propTypes = {
  data: arrayOf(
    shape({
      dep_name: string,
      measure_type: string,
      employee_fullname: string,
      employee_number: string,
      planned_take_action_date: string,
      action_inputed_date: string,
      action_comment: string,
    }),
  ),
};

MeasureList.defaultProps = {
  data: [],
};

function MeasureList({ data }) {
  return (
    <div>
      <div styleName="toolbar">
        <Button primary>+ Добавить</Button>
      </div>
      <Table
        columns={[
          {
            title: 'СПП',
            dataIndex: 'dep_name',
          },
          {
            title: 'Типовая мера',
            dataIndex: 'measure_type',
          },
          {
            title: 'ФИО сотрудника',
            dataIndex: 'employee_fullname',
          },
          {
            title: 'Табельный номер',
            dataIndex: 'employee_number',
          },
          {
            title: 'Плановая дата принятия мер',
            dataIndex: 'planned_take_action_date',
          },
          {
            title: 'Дата ввода меры',
            dataIndex: 'action_inputed_date',
          },
          {
            title: 'Комментарий',
            dataIndex: 'action_comment',
          },
        ]}
      />
    </div>
  );
}

export default compose(pure)(MeasureList);
