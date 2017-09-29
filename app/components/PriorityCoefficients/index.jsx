import React from 'react';
import { number, arrayOf, shape, object, func, string, bool } from 'prop-types';
import { compose, pure, withHandlers } from 'recompose';
import { Input, Card, Button, Modal, Popconfirm, Table } from 'antd';
import { path } from 'ramda';
import EditableCell from '../ui/Table/EditableCell';
import './index.less';
import { renderCell } from '../../utils/tableRender';

const recordShape = shape({
  id: number,
  metrics: string,
  formulas: number,
  attention: number,
});

PriorityCoefficients.propTypes = {
  editableRecord: recordShape,
  data: arrayOf(recordShape),
  onChangeEditableRecord:
    func.isRequired /* eslint react/no-unused-prop-types: 0 */,
  onSave: func.isRequired,
  handleEdit: func.isRequired,
  handleCellChange: func.isRequired,
  handleCancel: func.isRequired,
  permissions: shape({
    priorityCoefficientsView: bool,
    priorityCoefficientsEdit: bool,
  }),
};

PriorityCoefficients.defaultProps = {
  data: [],
  editableRecord: null,
  permissions: null,
};

function PriorityCoefficients({
  data,
  editableRecord,
  onSave,
  handleCancel,
  handleCellChange,
  handleEdit,
  permissions,
}) {
  return permissions.priorityCoefficientsView ? (
    <Card
      title=" "
      extra={
        <Input.Search
          placeholder="Поиск"
          onSearch={value => console.log(value)}
        />
      }
    >
      <Table
        dataSource={data.map(item => ({ ...item, key: item.id }))}
        pagination={false}
        styleName="table"
        columns={[
          {
            title: 'Метрика',
            sorter: (a, b) => a.metrics.localeCompare(b.metrics),
            render: (text, record, index) =>
              renderCell(
                index,
                'metrics',
                record,
                editableRecord,
                handleCellChange,
                true,
              ),
          },
          {
            title: 'Для формулы приоритезации',
            width: '20%',
            render: (text, record, index) =>
              renderCell(
                index,
                'formulas',
                record,
                editableRecord,
                handleCellChange,
                false,
              ),
          },
          {
            title: 'Для ленты "Требуют внимания"',
            width: '20%',
            render: (text, record, index) =>
              renderCell(
                index,
                'attention',
                record,
                editableRecord,
                handleCellChange,
                false,
              ),
          },
          {
            title: '',
            key: 'operation',
            width: '120px',
            fixed: 'right',
            render: (text, record) => {
              return (
                <span styleName="action-button-wrapper">
                  {editableRecord && editableRecord.id === record.id ? (
                    <span>
                      <Button.Group>
                        <Button
                          icon="save"
                          onClick={onSave}
                          disabled={!permissions.priorityCoefficientsEdit}
                        />
                        <Popconfirm
                          title="Отменить изменения?"
                          onConfirm={handleCancel}
                        >
                          <Button
                            icon="close"
                            disabled={!permissions.priorityCoefficientsEdit}
                          />
                        </Popconfirm>
                      </Button.Group>
                    </span>
                  ) : (
                    <span>
                      <Button
                        icon="edit"
                        disabled={
                          !permissions.priorityCoefficientsEdit ||
                          editableRecord !== null
                        }
                        onClick={() => handleEdit(record)}
                      />
                    </span>
                  )}
                </span>
              );
            },
          },
        ]}
      />
    </Card>
  ) : (
    <Card>Доступ к данному справочнику ограничен.</Card>
  );
}

export default compose(
  withHandlers({
    handleCellChange: ({ onChangeEditableRecord, editableRecord }) => (
      field,
      index,
      value,
    ) => onChangeEditableRecord({ ...editableRecord, [field]: value }),
    handleEdit: ({ onChangeEditableRecord }) => record =>
      onChangeEditableRecord(record),
    handleCancel: ({ onChangeEditableRecord }) => () =>
      onChangeEditableRecord(null),
  }),
  pure,
)(PriorityCoefficients);
