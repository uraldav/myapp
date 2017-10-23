import React from 'react';
import { object, arrayOf, shape, func, string } from 'prop-types';
import { compose, pure } from 'recompose';
import { Card, Input, Button, Tree, Icon } from 'antd';
import './Thematics.less';

Thematics.propTypes = {
  data: arrayOf(
    shape({
      title: string,
      children: arrayOf(object),
    }),
  ),
  permissions: arrayOf(string),
  editableRecord: object,
  onAdd: func.isRequired,
};

Thematics.defaultProps = {
  data: [],
  editableRecord: null,
  permissions: {
    thematicsEdit: false,
  },
};

function Thematics({ data, onAdd, permissions, editableRecord }) {
  return (
    <Card>
      <Input.Search placeholder="Поиск" />
      <Tree showLine styleName="tree">
        <Tree.TreeNode
          title={<Icon type="plus" title="Добавить классификатор" />}
          key="new"
        />
        {mapDataToTreeNode(data)}
      </Tree>
    </Card>
  );
}

function mapDataToTreeNode(data) {
  return data.map(({ name, children = [] }) => {
    const title = (
      <span>
        {name}
        &nbsp;&nbsp;&nbsp;
        <Icon type="plus" title="Добавить дочерний классификатор" />
        &nbsp;&nbsp;
        <Icon type="minus" title="Удалить классификатор" />
      </span>
    );
    return children.length === 0 ? (
      <Tree.TreeNode title={title} key={name} />
    ) : (
      <Tree.TreeNode title={title} key={name}>
        {mapDataToTreeNode(children)}
      </Tree.TreeNode>
    );
  });
}

export default compose(pure)(Thematics);
