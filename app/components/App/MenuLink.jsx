import React from 'react';
import { string, number, node, any } from 'prop-types';
import { compose, pure } from 'recompose';
import { Badge } from 'antd';
import { NavLink } from 'react-router-dom';
import { range, map } from 'ramda';
import './MenuLink.less';

MenuLink.propTypes = {
  title: string.isRequired,
  to: any.isRequired,
  badge: number,
  icon: node,
  level: number,
};

MenuLink.defaultProps = {
  badge: 0,
  icon: null,
  level: 0,
};

function MenuLink({ title, to, badge, icon, level }) {
  return (
    <NavLink to={to} styleName="menulink">
      {map(() => <div styleName="spacer" />, range(0, level))}
      {icon && <div styleName="icon">{icon}</div>}
      <div styleName="title">{title}</div>
      {badge > 0 && <Badge count={badge} />}
    </NavLink>
  );
}

export default compose(pure)(MenuLink);
