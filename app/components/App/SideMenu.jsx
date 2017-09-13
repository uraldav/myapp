import React from 'react';
import { object } from 'prop-types';
import { compose, pure } from 'recompose';
import { Menu, Icon } from 'antd';
import FaIcon from 'react-fontawesome';
import queryString from 'query-string';
import MenuLink from './MenuLink';
import './SideMenu.less';

const { SubMenu } = Menu;

SideMenu.propTypes = {
  location: object.isRequired,
};

function SideMenu({ location }) {
  const queryParams = queryString.parse(location.search);

  return (
    <Menu
      multiple
      mode="inline"
      styleName="menu"
      selectedKeys={[queryParams.socialId]}
    >
      <SubMenu
        key="twitter"
        className={queryParams.socialId === 'twitter' ? 'selected' : ''}
        title={
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
        }
      >
        {[
          { title: 'Чубайс', id: 'chubais', badge: 7 },
          { title: 'Пушкин', id: 'pooshka', badge: 4 },
          { title: 'Ленин', id: 'lenin', badge: 1 },
        ].map(menuItem => (
          <Menu.Item key={menuItem.id}>
            <MenuLink
              title={menuItem.title}
              to={{
                pathname: '/',
                search: `?${queryString.stringify({
                  ...queryParams,
                  socialId: menuItem.id,
                })}`,
              }}
              badge={menuItem.badge}
            />
          </Menu.Item>
        ))}
      </SubMenu>
      <SubMenu
        key="facebook"
        className={queryParams.socialId === 'facebook' ? 'selected' : ''}
        title={
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
        }
      >
        {[
          { title: 'Чубайс Фейс', id: 'f-chubais', badge: 7 },
          { title: 'Пушкин Фейс', id: 'f-pooshka', badge: 4 },
          { title: 'Ленин Фейс', id: 'f-lenin', badge: 1 },
        ].map(menuItem => (
          <Menu.Item key={menuItem.id}>
            <MenuLink
              title={menuItem.title}
              to={{
                pathname: '/',
                search: `?${queryString.stringify({
                  ...queryParams,
                  socialId: menuItem.id,
                })}`,
              }}
              badge={menuItem.badge}
            />
          </Menu.Item>
        ))}
      </SubMenu>
      <SubMenu
        key="others"
        title={
          <span>
            <FaIcon name="square-o" />
            <span>Неявные упоминания</span>
          </span>
        }
      >
        <Menu.Item>
          <span>аэрофлот</span>
        </Menu.Item>
      </SubMenu>
      <SubMenu
        key="settings"
        title={
          <span>
            <Icon type="setting" />
            <span>Справочники и настройки</span>
          </span>
        }
      >
        <Menu.Item>
          <MenuLink
            icon={<Icon type="team" />}
            title="Пользователи"
            to="/users"
          />
        </Menu.Item>
        <Menu.Item>
          <MenuLink
            icon={<Icon type="book" />}
            title="Тематики и словари"
            to="/thematics"
          />
        </Menu.Item>
        <Menu.Item>
          <MenuLink
            icon={<Icon type="person" />}
            tittle="Важные авторы"
            to="/importantAuthor"
          />
        </Menu.Item>
        <Menu.Item>
          <MenuLink
            icon={<Icon type="filter" />}
            title="Коэффициенты для приоритезации"
            to="/priority_coefficients"
          />
        </Menu.Item>
      </SubMenu>
    </Menu>
  );
}

export default compose(pure)(SideMenu);
