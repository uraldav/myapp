import React from 'react';
import { string, number, node, any, bool, func } from 'prop-types';
import { compose, pure } from 'recompose';
import { Badge, Icon } from 'antd';
import { NavLink } from 'react-router-dom';
import { range, map } from 'ramda';
import cn from 'classnames';
import './MenuLink.less';

MenuLink.propTypes = {
  title: string.isRequired,
  to: any.isRequired,
  badge: number,
  icon: node,
  level: number,
  expanderVisible: bool,
  isExpanded: bool,
  onClickExpander: func.isRequired,
};

MenuLink.defaultProps = {
  badge: 0,
  icon: null,
  level: 0,
  expanderVisible: false,
  isExpanded: false,
};

function MenuLink({
  title,
  to,
  badge,
  icon,
  level,
  expanderVisible,
  isExpanded,
  onClickExpander,
}) {
  return (
    <NavLink
      to={to}
      styleName="menulink"
      className={cn({ expanded: isExpanded })}
    >
      {map(() => <div styleName="spacer" />, range(0, level))}
      {icon && <div styleName="icon">{icon}</div>}
      <div styleName="title">{title}</div>
      {badge > 0 && <Badge count={badge} />}
      {expanderVisible && (
        <div
          styleName="expander"
          role="button"
          tabIndex="-1"
          onClick={(e) => {
            e.preventDefault();
            onClickExpander();
          }}
        >
          <Icon type="down" />
        </div>
      )}
    </NavLink>
  );
}

export default compose(pure)(MenuLink);
