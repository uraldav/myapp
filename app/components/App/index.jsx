import React from 'react';
import { func, bool, node, object, shape, array, string } from 'prop-types';
import { compose, pure, withHandlers, withState } from 'recompose';
import { Layout, Icon, Tooltip } from 'antd';
import ScrollArea from 'react-scrollbar';
import SideMenu from './SideMenu';
import './index.less';
import Header from '../Header';

const { Sider, Content } = Layout;

App.propTypes = {
  location: object.isRequired,
  children: node.isRequired,
  toggleSidebarCollapsed: func.isRequired,
  sidebarCollapsed: bool.isRequired,
  menuItems: shape({
    twitter: array,
    instagram: array,
    facebook: array,
  }),
  expandedMenuItems: array,
  selectedMenuItem: string,
  onChangeExpandedMenuItems: func.isRequired,
  isAuthorized: bool.isRequired,
};

App.defaultProps = {
  expandedMenuItems: [],
  selectedMenuItem: null,
  menuItems: {
    twitter: [],
    instagram: [],
    facebook: [],
  },
};

function App({
  location,
  children,
  toggleSidebarCollapsed,
  sidebarCollapsed,
  menuItems,
  expandedMenuItems,
  selectedMenuItem,
  onChangeExpandedMenuItems,
  isAuthorized,
}) {
  return (
    isAuthorized &&
    <Layout styleName="page">
      <Header />
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
            <SideMenu
              location={location}
              collapsed={sidebarCollapsed}
              menuItems={menuItems}
              expandedMenuItems={expandedMenuItems}
              selectedMenuItem={selectedMenuItem || undefined}
              onChangeExpandedMenuItems={onChangeExpandedMenuItems}
            />
          </ScrollArea>
        </Sider>
        <Content styleName="content">
          <ScrollArea smoothScrolling>{children}</ScrollArea>
        </Content>
      </Layout>
    </Layout>
  );
}

export default compose(
  withState('sidebarCollapsed', 'setSidebarCollapsed', false),
  withHandlers({
    toggleSidebarCollapsed: ({
      sidebarCollapsed,
      setSidebarCollapsed,
    }) => () => {
      setSidebarCollapsed(!sidebarCollapsed);
    },
  }),
  pure,
)(App);
