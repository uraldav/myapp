import React from 'react';
import { object, bool } from 'prop-types';
import { compose, pure } from 'recompose';
import { Icon, Badge } from 'antd';
import FaIcon from 'react-fontawesome';
import cn from 'classnames';
import queryString from 'query-string';
import MenuLink from './MenuLink';
import './SideMenu.less';

SideMenu.propTypes = {
  location: object.isRequired,
  collapsed: bool,
};

SideMenu.defaultProps = {
  collapsed: false,
};

function SideMenu({ location, collapsed }) {
  const queryParams = queryString.parse(location.search);

  return (
    <div styleName="menu" className={cn({ 'collapsed-menu': collapsed })}>
      <MenuLink
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
      />
      <MenuLink
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
      />
    </div>
  );
}

export default compose(pure)(SideMenu);
