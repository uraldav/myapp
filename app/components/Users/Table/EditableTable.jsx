import React from 'react';
import { number, arrayOf, shape, object, func } from 'prop-types';
import { Table, Button, Modal, Popconfirm } from 'antd';
import { pure, withState, withHandlers, compose } from 'recompose';
import EditableCell from './EditableCell';
import './EditableTable.less';

EditableTable.propTypes = {
  data: arrayOf(
    shape({
      id: number,
      key: number,
      name: object,
      login: object,
      position: object,
      mail: object,
      role: object,
    }),
  ),
  onSave: func.isRequired, /* eslint react/no-unused-prop-types: 0 */
  editableRow: object.isRequired,
  handleEdit: func.isRequired,
  handleCellChange: func.isRequired,
  handleSave: func.isRequired,
  handleCancel: func.isRequired,
};

EditableTable.defaultProps = {
  data: [],
};

function EditableTable({
  data,
  editableRow,
  handleCellChange,
  handleEdit,
  handleSave,
  handleCancel,
}) {
  return (
    <Table
      dataSource={data}
      pagination={false}
      styleName="table"
      columns={[
        {
          title: 'ФИО',
          sorter: (a, b) => a.name.localeCompare(b.name),
          render: (text, record, index) =>
            renderCell(index, 'name', record, editableRow, handleCellChange),
        },
        {
          title: 'Логин',
          width: '12%',
          sorter: (a, b) => a.login.localeCompare(b.login),
          render: (text, record, index) =>
            renderCell(index, 'login', record, editableRow, handleCellChange),
        },
        {
          title: 'Должность',
          width: '17%',
          sorter: (a, b) => a.position.localeCompare(b.position),
          render: (text, record, index) =>
            renderCell(index, 'position', record, editableRow, handleCellChange),
        },
        {
          title: 'E-mail',
          width: '17%',
          sorter: (a, b) => a.mail.localeCompare(b.mail),
          render: (text, record, index) =>
            renderCell(index, 'mail', record, editableRow, handleCellChange),
        },
        {
          title: 'Роль',
          width: '12%',
          sorter: (a, b) => a.role.localeCompare(b.role),
          render: (text, record, index) =>
            renderCell(index, 'role', record, editableRow, handleCellChange),
        },
        {
          title: '',
          key: 'operation',
          width: '120px',
          fixed: 'right',

          render: (text, record) => {
            return (
              <span styleName="action-button-wrapper">
                {editableRow && editableRow.key === record.key ? (
                  <span>
                    <Button.Group>
                      <Button
                        icon="save"
                        onClick={handleSave}
                      />
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
                      disabled={editableRow !== null}
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
                      content: `Вы уверены, что хотите удалить пользователя  ${record.name}?`,
                      iconType: 'exclamation-circle',
                    })}
                />
              </span>
            );
          },
        },
      ]}
    />
  );
}

function renderCell(index, field, record, editableRow, handleCellChange) {
  const isEditableCell = editableRow !== null && editableRow.key === record.key;

  if (isEditableCell) {
    return (
      <EditableCell
        editable
        value={editableRow[field]}
        onChange={value => handleCellChange(field, index, value)}
      />
    );
  }
  return record[field];
}

export default compose(
  withState('editableRow', 'setEditableRow', null),
  withHandlers({
    handleCellChange: ({ setEditableRow, data }) => (field, index, value) =>
      setEditableRow({ ...data[index], [field]: value }),
    handleEdit: ({ setEditableRow }) => record => setEditableRow(record),
    handleCancel: ({ setEditableRow }) => () => setEditableRow(null),
    handleSave: ({ setEditableRow, editableRow, onSave }) => () => { onSave(editableRow); setEditableRow(null); },
  }),
  pure,
)(EditableTable);
