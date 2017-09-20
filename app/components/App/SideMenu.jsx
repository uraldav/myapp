import React from 'react';
import { object, bool, func } from 'prop-types';
import { compose, pure, withState, withHandlers } from 'recompose';
import { Icon, Badge } from 'antd';
import FaIcon from 'react-fontawesome';
import cn from 'classnames';
import queryString from 'query-string';
import { uniq, append, filter } from 'ramda';
import MenuLink from './MenuLink';
import './SideMenu.less';

SideMenu.propTypes = {
  location: object.isRequired,
  collapsed: bool,
  handleClickExpander: func.isRequired,
};

SideMenu.defaultProps = {
  collapsed: false,
};

function SideMenu({ location, collapsed, handleClickExpander }) {
  const queryParams = queryString.parse(location.search);

  return (
    <div styleName="menu" className={cn({ 'collapsed-menu': collapsed })}>
      <MenuLink
        expanderVisible
        title="Twitter"
        icon={<FaIcon name="twitter" />}
        to={{
          pathname: '/',
          search: `?${queryString.stringify({
            ...queryParams,
            socialId: 'twitter',
          })}`,
        }}
        badge={9}
        onClickExpander={() => handleClickExpander('twitter')}
      />
      <MenuLink
        expanderVisible
        title="Facebook"
        icon={<FaIcon name="facebook-square" />}
        to={{
          pathname: '/',
          search: `?${queryString.stringify({
            ...queryParams,
            socialId: 'facebook',
          })}`,
        }}
        badge={9}
        onClickExpander={() => handleClickExpander('twitter')}
      />
    </div>
  );
}

export default compose(
  withState('expandedMenuItems', 'setExpandedMenuItems', []),
  withHandlers({
    handleClickExpander: ({ expandedMenuItems, setExpandedMenuItems }) => (
      expandableMenuItem,
      isExpanded,
    ) =>
      setExpandedMenuItems(
        isExpanded
          ? uniq(append(expandableMenuItem, expandedMenuItems))
          : filter(x => x !== expandableMenuItem, expandedMenuItems),
      ),
  }),
  pure,
)(SideMenu);
