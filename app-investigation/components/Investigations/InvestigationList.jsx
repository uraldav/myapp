import React from 'react';
import { bool, arrayOf, shape, number, string, object } from 'prop-types';
import { Table, Checkbox } from 'antd';
import './InvestigationList.less';

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
  selectedInvestigation: object,
};

InvestigationList.defaultProps = {
  loading: false,
  data: [],
  visibleOptionalColumn: true,
  selectedInvestigation: null,
};

function InvestigationList({
  loading,
  visibleOptionalColumn,
  selectedInvestigation,
  data,
  ...props
}) {
  return (
    <Table
      {...props}
      loading={loading}
      dataSource={data.map(x => ({ ...x, key: x.id }))}
      pagination={false}
    >
      <Table.Column
        styleName="cell"
        title="ID"
        dataIndex="id"
        render={(text, record, index) =>
          renderCell(text, record, index, selectedInvestigation)}
      />
      {visibleOptionalColumn && (
        <Table.Column
          styleName="cell"
          title="SR ID"
          dataIndex="srId"
          render={(text, record, index) =>
            renderCell(text, record, index, selectedInvestigation)}
        />
      )}
      <Table.Column
        styleName="cell"
        title="СПО"
        dataIndex="depName"
        render={(text, record, index) =>
          renderCell(text, record, index, selectedInvestigation)}
      />
      <Table.Column
        styleName="cell"
        title="Статус"
        dataIndex="status"
        render={(text, record, index) =>
          renderCell(text, record, index, selectedInvestigation)}
      />
      {visibleOptionalColumn && (
        <Table.Column
          styleName="cell"
          title="Дата открытия"
          dataIndex="openDate"
          render={(text, record, index) =>
            renderCell(text, record, index, selectedInvestigation)}
        />
      )}
      <Table.Column
        styleName="cell"
        title="Плановая дата завершения"
        dataIndex="plannedCompletionDate"
        render={(text, record, index) =>
          renderCell(text, record, index, selectedInvestigation)}
      />
      <Table.Column
        styleName="cell"
        title="Критичность"
        dataIndex="critical"
        render={(text, record, index) =>
          renderCheckbox(text, record, index, selectedInvestigation)}
      />
      {visibleOptionalColumn && (
        <Table.Column
          styleName="cell"
          title="Исполнитель СПР"
          dataIndex="userLogin"
          render={(text, record, index) =>
            renderCell(text, record, index, selectedInvestigation)}
        />
      )}
      {visibleOptionalColumn && (
        <Table.Column
          styleName="cell"
          title="Дата завершения"
          dataIndex="completedDate"
          render={(text, record, index) =>
            renderCell(text, record, index, selectedInvestigation)}
        />
      )}
      {visibleOptionalColumn && (
        <Table.Column
          styleName="cell"
          title="Дата закрытия"
          dataIndex="closeDate"
          render={(text, record, index) =>
            renderCell(text, record, index, selectedInvestigation)}
        />
      )}
    </Table>
  );
}

function renderCell(text, record, index, selected) {
  return selected !== null && selected.id === record.id ? (
    <span styleName="cell-inner-selected">{text}</span>
  ) : (
    <span styleName="cell-inner">{text}</span>
  );
}

function renderCheckbox(value, record, index, selected) {
  return selected !== null && selected.id === record.id ? (
    <span styleName="cell-inner-selected">{<Checkbox checked={value} />}</span>
  ) : (
    <span styleName="cell-inner">{<Checkbox checked={value} />}</span>
  );
}

export default InvestigationList;
