import React from 'react';
import { object, bool, func, array, shape, string } from 'prop-types';
import { compose, pure, withHandlers } from 'recompose';
import { Icon } from 'antd';
import FaIcon from 'react-fontawesome';
import cn from 'classnames';
import queryString from 'query-string';
import { uniq, append, filter, omit, sum, map } from 'ramda';
import MenuLink from './MenuLink';
import './SideMenu.less';

SideMenu.propTypes = {
  location: object.isRequired,
  collapsed: bool,
  expandedMenuItems: array,
  selectedMenuItem: shape({ item: string, parent: string }),
  handleClickExpander: func.isRequired,
};

SideMenu.defaultProps = {
  collapsed: false,
  expandedMenuItems: [],
  selectedMenuItem: {},
};

function SideMenu({
  location,
  collapsed,
  handleClickExpander,
  expandedMenuItems,
  selectedMenuItem,
}) {
  return (
    <div styleName="menu" className={cn({ 'collapsed-menu': collapsed })}>
      <MenuLink
        title="Расследования"
        icon={<FaIcon name="inbox" />}
        isSelected={false}
        to="/investigations"
      />
      <MenuLink
        title="Массовые меры"
        icon={<FaIcon name="check-square" />}
        isSelected={false}
        to="/mass_measures"
      />
      <MenuLink
        expanderVisible
        title="Справочники и настройки"
        icon={<FaIcon name="cog" />}
        isSelected={false}
        isExpanded={expandedMenuItems.includes('settings')}
        onClick={() =>
          handleClickExpander(
            'settings',
            !expandedMenuItems.includes('settings'),
          )}
      />
      {expandedMenuItems.includes('settings') &&
        [
          <MenuLink
            level={1}
            isSelected={
              selectedMenuItem.item === 'users' &&
              selectedMenuItem.parent === 'settings'
            }
            icon={<Icon type="team" />}
            title="Пользователи"
            to="/users"
          />,
          <MenuLink
            level={1}
            isSelected={
              selectedMenuItem.item === 'user_roles' &&
              selectedMenuItem.parent === 'settings'
            }
            icon={<Icon type="solution" />}
            title="Роли пользователей"
            to="/user_roles"
          />,
        ].map(item => item)}
    </div>
  );
}

export default compose(
  withHandlers({
    handleClickExpander: ({ expandedMenuItems, onChangeExpandedMenuItems }) => (
      expandableMenuItem,
      isExpanded,
    ) =>
      onChangeExpandedMenuItems(
        isExpanded
          ? uniq(append(expandableMenuItem, expandedMenuItems))
          : filter(x => x !== expandableMenuItem, expandedMenuItems),
      ),
  }),
  pure,
)(SideMenu);
