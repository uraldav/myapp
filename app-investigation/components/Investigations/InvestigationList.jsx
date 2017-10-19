import React from 'react';
import { bool, arrayOf, shape, number, string } from 'prop-types';
import { Table } from 'antd';

export const dataPropTypes = arrayOf(
  shape({
    id: number,
    srId: number,
    depName: string,
    status: string,
    openDate: string,
    plannedCompletionDate: string,
    critical: bool,
    userLogin: string,
    completedDate: string,
    closeDate: string,
  }),
);

InvestigationList.propTypes = {
  loading: bool,
  data: dataPropTypes,
  visibleOptionalColumn: bool,
};

InvestigationList.defaultProps = {
  loading: false,
  data: [],
  visibleOptionalColumn: true,
};

function InvestigationList({ loading, visibleOptionalColumn, data, ...props }) {
  const optionalColumns = getOptionalColumns();
  return (
    <Table
      {...props}
      loading={loading}
      dataSource={data.map(x => ({ ...x, key: x.id }))}
      pagination={false}
      columns={[
        {
          title: 'ID',
          dataIndex: 'id',
        },
        {
          title: 'SR ID',
          dataIndex: 'srId',
        },
        {
          title: 'СПО',
          dataIndex: 'depName',
        },
        {
          title: 'Статус',
          dataIndex: 'status',
        },
        {
          title: 'Дата открытия',
          dataIndex: 'openDate',
        },
        {
          title: 'Плановая дата завершения',
          dataIndex: 'plannedCompletionDate',
        },
        {
          title: 'Критичность',
          dataIndex: 'critical',
        },
        {
          title: 'Исполнитель СПР',
          dataIndex: 'userLogin',
        },
        {
          title: 'Дата завершения',
          dataIndex: 'completedDate',
        },
        {
          title: 'Дата закрытия',
          dataIndex: 'closeDate',
        },
      ].filter(column => !optionalColumns.includes(column.dataIndex))}
    />
  );
}

function getOptionalColumns() {
  return ['srId', 'openDate', 'closeDate', 'completedDate', 'userLogin'];
}

export default InvestigationList;
