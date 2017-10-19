import React from 'react';
import { arrayOf, shape, string } from 'prop-types';
import { compose, pure } from 'recompose';
import { Table } from 'antd';

SRAttachmentList.propTypes = {
  data: arrayOf(
    shape({
      name: string,
      size: string,
      type: string,
      modified: string,
      comments: string,
    }),
  ),
};

SRAttachmentList.defaultProps = {
  data: [],
};

function SRAttachmentList({ data }) {
  return (
    <Table
      columns={[
        {
          title: 'Name',
          dataIndex: 'name',
        },
        {
          title: 'Size (In Bytes)',
          dataIndex: 'size',
        },
        {
          title: 'Type',
          dataIndex: 'type',
        },
        {
          title: 'Modified',
          dataIndex: 'mofified',
        },
        {
          title: 'Comments',
          dataIndex: 'comments',
        },
      ]}
    />
  );
}

export default compose(pure)(SRAttachmentList);
