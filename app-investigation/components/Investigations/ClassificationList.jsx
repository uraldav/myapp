import React from 'react';
import { arrayOf, shape, string } from 'prop-types';
import { compose, pure } from 'recompose';
import { Table, Button } from 'antd';
import './ClassificationList.less';

ClassificationList.propTypes = {
  data: arrayOf(
    shape({
      theme_first: string,
      theme_second: string,
      theme_third: string,
      theme_fourth: string,
    }),
  ),
};

ClassificationList.defaultProps = {
  data: [],
};

function ClassificationList({ data }) {
  return (
    <div>
      <div styleName="toolbar">
        <Button primary>+ Добавить</Button>
      </div>
      <Table
        columns={[
          {
            title: 'Первый уровень',
            dataIndex: 'theme_first',
          },
          {
            title: 'Второй уровень',
            dataIndex: 'theme_second',
          },
          {
            title: 'Третий уровень',
            dataIndex: 'theme_third',
          },
          {
            title: 'Четвертый уровень',
            dataIndex: 'theme_fourth',
          },
        ]}
      />
    </div>
  );
}

export default compose(pure)(ClassificationList);
