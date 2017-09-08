import React from 'react';
import { func, bool, node, object } from 'prop-types';
import { compose, pure, withHandlers, withState } from 'recompose';
import { Layout, Icon, Tooltip } from 'antd';
import ScrollArea from 'react-scrollbar';
import SideMenu from './SideMenu';
import './index.less';

import Users from '../Users/Users';

const { Header, Sider, Content } = Layout;

App.propTypes = {
  location: object.isRequired,
  children: node.isRequired,
  toggleSidebarCollapsed: func.isRequired,
  sidebarCollapsed: bool.isRequired,
};

function App({ location, children, toggleSidebarCollapsed, sidebarCollapsed }) {
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
            <SideMenu location={location} />
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
