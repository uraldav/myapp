import React from 'react';
import { compose, pure, withState, withHandlers } from 'recompose';
import { Card, Table, Button, Modal, Select } from 'antd';
import { renderCell } from 'app-common/utils/tableRender';
import { arrayOf, object, func, bool } from 'prop-types';
import './index.less';

Reasons.propTypes = {
  editableRecord: object,
  data: arrayOf(object),
};

Reasons.defaultProps = {
  data: [],
  editableRecord: null,
};

const onAdd = () => {};
const handleCellChange = () => {};
const onDelete = () => {};
const onSave = () => {};
const handleEdit = () => {};
const handleCancel = () => {};

const Popconfirm = Modal.Popconfirm;

function Reasons({ data, editableRecord }) {
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
            title: 'Код причины',
            sorter: (a, b) => a.id - b.id,
            dataIndex: 'id',
          },
          {
            title: 'Типовая причина',
            sorter: (a, b) => a.reason.localeCompare(b.reason),
            dataIndex: 'reason',
            render: (text, record, index) =>
              renderCell(
                index,
                'reason',
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
                  {editableRecord &&
                  editableRecord.id === record.id ? (
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
                        content: `Вы уверены, что хотите удалить подразделение ${record.dep_name}?`,
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

export default compose(pure)(Reasons);
