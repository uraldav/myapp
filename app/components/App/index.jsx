import React from 'react';
import { func, bool, node, object } from 'prop-types';
import { compose, pure, withHandlers, withState } from 'recompose';
import { Layout, Menu, Icon, Tooltip } from 'antd';
import FaIcon from 'react-fontawesome';
import ScrollArea from 'react-scrollbar';
import queryString from 'query-string';
import MenuLink from './MenuLink';
import './index.less';

import Users from '../Users/Users';

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

App.propTypes = {
  location: object.isRequired,
  children: node.isRequired,
  toggleSidebarCollapsed: func.isRequired,
  sidebarCollapsed: bool.isRequired,
};

function App({
  location,
  children,
  toggleSidebarCollapsed,
  sidebarCollapsed,
}) {
  const queryParams = queryString.parse(location.search);

  return (
    <Layout styleName="page">
      <Header styleName="header">
        <div styleName="logo">АЭРОФЛОТ</div>
      </Header>
      <Layout>
        <Sider
          trigger={
            <Tooltip
              title={sidebarCollapsed ? 'Развернуть меню' : 'Свернуть меню'}
              placement="right"
            >
              <Icon type={sidebarCollapsed ? 'menu-unfold' : 'menu-fold'} />
            </Tooltip>
          }
          collapsible
          collapsed={sidebarCollapsed}
          onCollapse={toggleSidebarCollapsed}
          styleName="sider"
          width={250}
        >
          <ScrollArea horizontal={false} smoothScrolling>
            <Menu
              multiple
              mode="inline"
              styleName="menu"
              selectedKeys={[queryParams.socialId]}
              openKeys={[queryParams.socialId]}
            >
              <SubMenu
                key="twitter"
                title={
                  <MenuLink
                    title="Twitter"
                    icon={<FaIcon name="twitter" />}
                    to={{
                      pathname: '/',
                      search: `?${queryString.stringify({ ...queryParams, socialId: 'twitter' })}`,
                    }}
                  />
                }
              >
                <Menu.Item>
                  <span>аэрофлот</span>
                </Menu.Item>
              </SubMenu>
              <SubMenu
                key="facebook"
                title={<span><FaIcon name="facebook-square" /><span>Facebook</span></span>}
              >
                <Menu.Item>
                  <span>аэрофлот</span>
                </Menu.Item>
              </SubMenu>
              <SubMenu
                key="others"
                title={<span><FaIcon name="square-o" /><span>Неявные упоминания</span></span>}
              >
                <Menu.Item>
                  <span>аэрофлот</span>
                </Menu.Item>
              </SubMenu>
              <SubMenu
                key="settings"
                title={<span><Icon type="setting" /><span>Справочники и настройки</span></span>}
              >
                <Menu.Item>
                  <Icon type="team" />
                  <span>Пользователи</span>
                </Menu.Item>
              </SubMenu>
            </Menu>
          </ScrollArea>
        </Sider>
        <Content styleName="content">
          <ScrollArea smoothScrolling>
            {children}
          </ScrollArea>
        </Content>
      </Layout>
    </Layout>
  );
}

export default compose(
  withState('sidebarCollapsed', 'setSidebarCollapsed', false),
  withHandlers({
    toggleSidebarCollapsed: ({ sidebarCollapsed, setSidebarCollapsed }) => () => {
      setSidebarCollapsed(!sidebarCollapsed);
    },
  }),
  pure,
)(App);
