import React from 'react';
import { arrayOf, shape, string } from 'prop-types';
import { compose, pure } from 'recompose';
import { Table, Button, Icon } from 'antd';
import './AttachmentsList.less';

AttachmentsList.propTypes = {
  data: arrayOf(
    shape({
      name_attach: string,
      size_attach: string,
      type_attach: string,
      modified_attach_date: string,
      user_id: string,
      comment_attach: string,
    }),
  ),
};

AttachmentsList.defaultProps = {
  data: [],
};

function AttachmentsList({ data }) {
  return (
    <div>
      <div styleName="toolbar">
        <Button primary>
          <Icon type="cloud-upload-o" /> Загрузить
        </Button>
      </div>
      <Table
        columns={[
          {
            title: 'Наименование',
            dataIndex: 'name_attach',
          },
          {
            title: 'Размер файла',
            dataIndex: 'size_attach',
          },
          {
            title: 'Тип файла',
            dataIndex: 'type_attach',
          },
          {
            title: 'Дата изменения',
            dataIndex: 'modified_attach_date',
          },
          {
            title: 'Изменено',
            dataIndex: 'user_id',
          },
          {
            title: 'Комментарий',
            dataIndex: 'comment_attach',
          },
        ]}
      />
    </div>
  );
}

export default compose(pure)(AttachmentsList);
