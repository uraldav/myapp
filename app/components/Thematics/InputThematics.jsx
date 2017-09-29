import React from 'react';
import {
  object,
  func,
  string,
  array,
  number,
  shape,
  arrayOf,
  bool,
} from 'prop-types';
import { compose, pure, withHandlers } from 'recompose';
import { Table, Button, Popconfirm, Modal, Card } from 'antd';
import { renderCell, renderCellWithTags } from '../../utils/tableRender';
import './index.less';

const recordShape = shape({
  id: number,
  name: string,
  words1: array,
  words2: array,
});

InputThematics.propTypes = {
  data: arrayOf(recordShape),
  loading: bool,
  editableCell: object,
  editableThematic: object,
  onAddWord: func.isRequired,
  onSaveWord: func.isRequired,
  onDeleteWord: func.isRequired,
  onAddThematic: func.isRequired,
  onDeleteThematic: func.isRequired,
  onChangeEditableThematic:
    func.isRequired /* eslint react/no-unused-prop-types: 0 */,
  onSaveThematic: func.isRequired,
  handleCellChange: func.isRequired,
  handleCancel: func.isRequired,
  handleEdit: func.isRequired,
  permissions: shape({
    thematicsView: bool,
    thematicsEdit: bool,
  }),
};

InputThematics.defaultProps = {
  data: [],
  loading: false,
  editableCell: null,
  editableThematic: null,
  permissions: null,
};

function InputThematics({
  data,
  loading,
  editableCell,
  onAddWord,
  onSaveWord,
  onDeleteWord,
  editableThematic,
  onAddThematic,
  onDeleteThematic,
  handleCellChange,
  handleCancel,
  onSaveThematic,
  handleEdit,
  permissions,
}) {
  return permissions.thematicsView ? (
    <Table
      loading={loading}
      title={() => (
        <Button
          type="primary"
          icon="plus"
          disabled={!permissions.thematicsEdit || editableThematic !== null}
          onClick={() => onAddThematic()}
        >
          Добавить
        </Button>
      )}
      pagination={false}
      dataSource={data.map(item => ({ ...item, key: item.id }))}
      columns={[
        {
          title: 'Тематика',
          dataIndex: 'name',
          render: (tags, record, index) =>
            renderCell(
              index,
              'name',
              record,
              editableThematic,
              handleCellChange,
              true,
            ),
        },
        {
          title: 'Слова для сочетания (1)',
          width: '40%',
          dataIndex: 'words1',
          render: (tags, record) =>
            renderCellWithTags(
              tags,
              'words1',
              record.id,
              editableCell,
              onAddWord,
              onSaveWord,
              onDeleteWord,
              editableThematic,
              permissions,
            ),
        },
        {
          title: 'Слова для сочетания (2)',
          width: '40%',
          dataIndex: 'words2',
          render: (tags, record) =>
            renderCellWithTags(
              tags,
              'words2',
              record.id,
              editableCell,
              onAddWord,
              onSaveWord,
              onDeleteWord,
              editableThematic,
              permissions,
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
                {permissions.thematicsEdit &&
                editableThematic &&
                editableThematic.id === record.id ? (
                  <span>
                    <Button.Group>
                      <Button icon="save" onClick={() => onSaveThematic()} />
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
                      disabled={
                        !permissions.thematicsEdit || editableThematic !== null
                      }
                      onClick={() => handleEdit(record)}
                    />
                  </span>
                )}
                <span className="ant-divider" />
                <Button
                  icon="delete"
                  disabled={!permissions.thematicsEdit}
                  onClick={() =>
                    Modal.confirm({
                      title: 'Удалить тематику?',
                      content: `Вы уверены, что хотите удалить тематику ${record.name}?`,
                      iconType: 'exclamation-circle',
                      onOk: () => Promise.resolve(onDeleteThematic(record)),
                    })}
                />
              </span>
            );
          },
        },
      ]}
    />
  ) : (
    <Card>Доступ к данному справочнику ограничен.</Card>
  );
}

export default compose(
  withHandlers({
    handleCellChange: ({ onChangeEditableThematic, editableThematic }) => (
      field,
      index,
      value,
    ) => onChangeEditableThematic({ ...editableThematic, [field]: value }),
    handleEdit: ({ onChangeEditableThematic }) => record =>
      onChangeEditableThematic(record),
    handleCancel: ({ onChangeEditableThematic }) => () =>
      onChangeEditableThematic(null),
  }),
  pure,
)(InputThematics);
