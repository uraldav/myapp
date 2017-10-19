import React from 'react';
import { arrayOf, shape, string } from 'prop-types';
import { compose, pure } from 'recompose';
import { Table } from 'antd';

RevisionHistory.propTypes = {
  data: arrayOf(
    shape({
      logs_date: string,
      logs_user: string,
      logs_attribute_name: string,
      logs_attribute_old: string,
      logs_attribute_new: string,
    }),
  ),
};

RevisionHistory.defaultProps = {
  data: null,
};

function RevisionHistory({ data }) {
  return (
    <Table
      columns={[
        {
          title: 'Дата и время изменения',
          dataIndex: 'logs_date',
        },
        {
          title: 'Пользователь',
          dataIndex: 'logs_user',
        },
        {
          title: 'Атрибут',
          dataIndex: 'logs_attribute_name',
        },
        {
          title: 'Старое значение',
          dataIndex: 'logs_attribute_old',
        },
        {
          title: 'Новое значение',
          dataIndex: 'logs_attribute_new',
        },
      ]}
    />
  );
}

export default compose(pure)(RevisionHistory);
