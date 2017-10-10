import React from 'react';
import { func, bool, node, object, array, string } from 'prop-types';
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
  expandedMenuItems: array,
  selectedMenuItem: string,
  onChangeExpandedMenuItems: func.isRequired,
  isAuthorized: bool.isRequired,
  onMenuCollapse: func.isRequired,
  onMenuExpand: func.isRequired,
  isMenuCollapsed: bool,
};

App.defaultProps = {
  expandedMenuItems: [],
  selectedMenuItem: null,
  isMenuCollapsed: false,
};

function App({
  location,
  children,
  expandedMenuItems,
  selectedMenuItem,
  onChangeExpandedMenuItems,
  isAuthorized,
  isMenuCollapsed,
  onMenuCollapse,
  onMenuExpand,
}) {
  return (
    isAuthorized && (
      <Layout styleName="page">
        <Header />
        <Layout>
          <Sider
            trigger={
              <Tooltip
                title={isMenuCollapsed ? 'Развернуть меню' : 'Свернуть меню'}
                placement="right"
              >
                <Icon type={isMenuCollapsed ? 'menu-unfold' : 'menu-fold'} />
              </Tooltip>
            }
            collapsible
            collapsed={isMenuCollapsed}
            onCollapse={isMenuCollapsed ? onMenuCollapse : onMenuExpand}
            styleName="sider"
            width={250}
          >
            <ScrollArea horizontal={false} smoothScrolling>
              <SideMenu
                location={location}
                collapsed={isMenuCollapsed}
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
    )
  );
}

export default compose(pure)(App);
