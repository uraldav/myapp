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
  isSelected: bool,
  onClickExpander: func.isRequired,
  onClick: func,
};

MenuLink.defaultProps = {
  badge: 0,
  icon: null,
  level: 0,
  expanderVisible: false,
  isExpanded: false,
  isSelected: false,
  onClick: x => x,
};

function MenuLink({
  title,
  to,
  badge,
  icon,
  level,
  expanderVisible,
  isExpanded,
  isSelected,
  onClick,
  onClickExpander,
}) {
  const Cmp = to ? NavLink : 'a';
  return (
    <Cmp
      to={to}
      styleName="menulink"
      className={cn({
        expanded: isExpanded,
        selected: isSelected,
        'not-root': level !== 0,
      })}
      onClick={onClick}
    >
      {map(() => <div styleName="spacer" />, range(0, level))}
      {icon && (
        <div styleName="icon" className="icon">
          {icon}
        </div>
      )}
      <div styleName="title" className="menulink-title">
        {title}
      </div>
      {badge > 0 && (
        <Badge className="menulink-badge" styleName="badge" count={badge} />
      )}
      {expanderVisible && (
        <div
          styleName="expander"
          className="menulink-expander"
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
    </Cmp>
  );
}

export default compose(pure)(MenuLink);
