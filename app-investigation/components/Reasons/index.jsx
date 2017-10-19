import React from 'react';
import { compose, pure, withState, withHandlers } from 'recompose';
import { Card, Table, Button, Modal, Select } from 'antd';
import { renderCell } from 'app-common/utils/tableRender';
import { arrayOf, object, func, bool } from 'prop-types';

Reasons.propTypes = {
  editableRecord: object,
  data: arrayOf(object),
};

Reasons.defaultProps = {
  data: [],
  editableRecord: null,
};

function Reasons({ data, editableRecord }) {
  return (
    <Card>
      <Table
        dataSource={data.map(item => ({ ...item, key: item.id }))}
        pagination={false}
        selectable
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
          },
        ]}
      />
    </Card>
  );
}

export default compose(pure)(Reasons);
