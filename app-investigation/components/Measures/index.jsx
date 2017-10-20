import React from 'react';
import { compose, pure, withState, withHandlers } from 'recompose';
import { Card, Table, Button, Modal, Select, Popconfirm } from 'antd';
import { renderCell } from 'app-common/utils/tableRender';
import { arrayOf, object, func, bool } from 'prop-types';
import './index.less';

Measures.propTypes = {
  editableRecord: object,
  data: arrayOf(object),
  handleCancel: func.isRequired,
  handleEdit: func.isRequired,
  handleCellChange: func.isRequired,
  onChangeEditableRecord:
    func.isRequired /* eslint react/no-unused-prop-types: 0 */,
  onAdd: func.isRequired,
  onDelete: func.isRequired,
  onSave: func.isRequired,
};

Measures.defaultProps = {
  data: [],
  editableRecord: null,
};

function Measures({
  data,
  editableRecord,
  handleCellChange,
  handleEdit,
  handleCancel,
  onChangeEditableRecord,
  onAdd,
  onDelete,
  onSave,
}) {
  return (
    <Card
      title={
        <Button
          type="primary"
          icon="plus"
          disabled={editableRecord !== null}
          onClick={onAdd}
        >
          Добавить
        </Button>
      }
    >
      <Table
        dataSource={data.map(item => ({ ...item, key: item.id }))}
        pagination={false}
        columns={[
          {
            title: 'Код меры',
            sorter: (a, b) => a.id - b.id,
            dataIndex: 'id',
          },
          {
            title: 'Типовая мера',
            sorter: (a, b) => a.measure.localeCompare(b.measure),
            dataIndex: 'measure',
            render: (text, record, index) =>
              renderCell(
                index,
                'measure',
                record,
                editableRecord,
                handleCellChange,
                true,
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
                        <Button icon="save" onClick={onSave} />
                        <Popconfirm
                          title="Отменить изменения?"
                          onConfirm={handleCancel}
                        >
                          <Button icon="close" />
                        </Popconfirm>
                      </Button.Group>
                    </span>
                  ) : (
                    <span>
                      <Button
                        icon="edit"
                        disabled={editableRecord !== null}
                        onClick={() => handleEdit(record)}
                      />
                    </span>
                  )}
                  <span className="ant-divider" />
                  <Button
                    icon="delete"
                    onClick={() =>
                      Modal.confirm({
                        title: 'Удалить пользователя?',
                        content: `Вы уверены, что хотите удалить меру ${record.id}?`,
                        iconType: 'exclamation-circle',
                        onOk: () => Promise.resolve(onDelete(record)),
                      })}
                  />
                </span>
              );
            },
          },
        ]}
      />
    </Card>
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
)(Measures);
