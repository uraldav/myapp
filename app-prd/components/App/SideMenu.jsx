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
  menuItems: shape({
    twitter: array,
    instagram: array,
    facebook: array,
  }),
  expandedMenuItems: array,
  selectedMenuItem: shape({ item: string, parent: string }),
  handleClickExpander: func.isRequired,
};

SideMenu.defaultProps = {
  collapsed: false,
  expandedMenuItems: [],
  selectedMenuItem: {},
  menuItems: {
    twitter: [],
    instagram: [],
    facebook: [],
  },
};

function SideMenu({
  location,
  collapsed,
  menuItems,
  handleClickExpander,
  expandedMenuItems,
  selectedMenuItem,
}) {
  const queryParams = queryString.parse(location.search);

  return (
    <div styleName="menu" className={cn({ 'collapsed-menu': collapsed })}>
      <MenuLink
        expanderVisible
        title="Twitter"
        icon={<FaIcon name="twitter" />}
        badge={sum(map(x => x.mentionCount, menuItems.twitter))}
        isSelected={
          selectedMenuItem.item === 'twitter' && !selectedMenuItem.parent
        }
        isExpanded={expandedMenuItems.includes('twitter')}
        onClickExpander={() =>
          handleClickExpander(
            'twitter',
            !expandedMenuItems.includes('twitter'),
          )}
        to={{
          pathname: '/',
          search: `?${queryString.stringify(
            omit(['socialWord'], {
              ...queryParams,
              socialId: 'twitter',
            }),
          )}`,
        }}
      />
      {collapsed ||
        !expandedMenuItems.includes('twitter') ||
        menuItems.twitter.map(item => (
          <MenuLink
            level={1}
            title={item.word}
            badge={item.mentionCount}
            isSelected={
              selectedMenuItem.item === item.word &&
              selectedMenuItem.parent === 'twitter'
            }
            to={{
              pathname: '/',
              search: `?${queryString.stringify({
                ...queryParams,
                socialId: 'twitter',
                socialWord: item.word,
              })}`,
            }}
          />
        ))}
      <MenuLink
        expanderVisible
        title="Instagram"
        icon={<FaIcon name="instagram" />}
        badge={sum(map(x => x.mentionCount, menuItems.instagram))}
        isSelected={
          selectedMenuItem.item === 'instagram' && !selectedMenuItem.parent
        }
        isExpanded={expandedMenuItems.includes('instagram')}
        onClickExpander={() =>
          handleClickExpander(
            'instagram',
            !expandedMenuItems.includes('instagram'),
          )}
        to={{
          pathname: '/',
          search: `?${queryString.stringify(
            omit(['socialWord'], {
              ...queryParams,
              socialId: 'instagram',
            }),
          )}`,
        }}
      />
      {collapsed ||
        !expandedMenuItems.includes('instagram') ||
        menuItems.instagram.map(item => (
          <MenuLink
            level={1}
            title={item.word}
            badge={item.mentionCount}
            isSelected={
              selectedMenuItem.item === item.word &&
              selectedMenuItem.parent === 'instagram'
            }
            to={{
              pathname: '/',
              search: `?${queryString.stringify({
                ...queryParams,
                socialId: 'instagram',
                socialWord: item.word,
              })}`,
            }}
          />
        ))}
      <MenuLink
        expanderVisible
        title="Facebook"
        icon={<FaIcon name="facebook-square" />}
        badge={sum(map(x => x.mentionCount, menuItems.facebook))}
        isSelected={
          selectedMenuItem.item === 'facebook' && !selectedMenuItem.parent
        }
        isExpanded={expandedMenuItems.includes('facebook')}
        onClickExpander={() =>
          handleClickExpander(
            'facebook',
            !expandedMenuItems.includes('facebook'),
          )}
        to={{
          pathname: '/',
          search: `?${queryString.stringify(
            omit(['socialWord'], {
              ...queryParams,
              socialId: 'facebook',
            }),
          )}`,
        }}
      />
      {collapsed ||
        !expandedMenuItems.includes('facebook') ||
        menuItems.facebook.map(item => (
          <MenuLink
            level={1}
            title={item.word}
            badge={item.mentionCount}
            isSelected={
              selectedMenuItem.item === item.word &&
              selectedMenuItem.parent === 'facebook'
            }
            to={{
              pathname: '/',
              search: `?${queryString.stringify({
                ...queryParams,
                socialId: 'facebook',
                socialWord: item.word,
              })}`,
            }}
          />
        ))}
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
              selectedMenuItem.item === 'thematics' &&
              selectedMenuItem.parent === 'settings'
            }
            icon={<Icon type="book" />}
            title="Тематики и словари"
            to="/thematics"
          />,
          <MenuLink
            level={1}
            isSelected={
              selectedMenuItem.item === 'important_authors' &&
              selectedMenuItem.parent === 'settings'
            }
            icon={<Icon type="user" />}
            title="Важные авторы"
            to="/important_authors"
          />,
          <MenuLink
            level={1}
            isSelected={
              selectedMenuItem.item === 'priority_coefficients' &&
              selectedMenuItem.parent === 'settings'
            }
            icon={<Icon type="filter" />}
            title="Коэффициенты для приоритезации"
            to="/priority_coefficients"
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
