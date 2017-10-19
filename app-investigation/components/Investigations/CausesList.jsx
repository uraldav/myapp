import React from 'react';
import { arrayOf, shape, string } from 'prop-types';
import { compose, pure } from 'recompose';
import { Table, Button } from 'antd';
import './CausesList.less';

CausesList.propTypes = {
  data: arrayOf(
    shape({
      first_level: string,
      second_level: string,
      third_level: string,
      fourth_level: string,
    }),
  ),
};

CausesList.defaultProps = {
  data: [],
};

function CausesList({ data }) {
  return (
    <div>
      <div styleName="toolbar">
        <Button primary>+ Добавить</Button>
      </div>
      <Table
        columns={[
          {
            title: 'Код подразделения',
            dataIndex: 'dep_code',
          },
          {
            title: 'Наименование подразделения',
            dataIndex: 'dep_name',
          },
          {
            title: 'ФИО сотрудника',
            dataIndex: 'employee_fullname',
          },
          {
            title: 'Табельный номер',
            dataIndex: 'employee_number',
          },
        ]}
      />
    </div>
  );
}

export default compose(pure)(CausesList);
