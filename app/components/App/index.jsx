import React from 'react';
import { func, bool, shape, string, node, object } from 'prop-types';
import { compose, pure, withHandlers, withState } from 'recompose';
import injectStyles from 'react-jss';
import { Layout, Menu, Icon, Badge, Tooltip } from 'antd';
import FaIcon from 'react-fontawesome';
import ScrollArea from 'react-scrollbar';

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

App.propTypes = {
  location: object.isRequired,
  children: node.isRequired,
  classes: shape({
    page: string.isRequired,
    header: string.isRequired,
    trigger: string.isRequired,
    logo: string.isRequired,
  }).isRequired,
  toggleSidebarCollapsed: func.isRequired,
  sidebarCollapsed: bool.isRequired,
};

function App({
  location,
  children,
  classes,
  toggleSidebarCollapsed,
  sidebarCollapsed,
}) {
  return (
    <Layout className={classes.page}>
      <Header className={classes.header}>
        <div className={classes.logo}>АЭРОФЛОТ</div>
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
          className={classes.sider}
          width={250}
        >
          <ScrollArea horizontal={false} smoothScrolling>
            <Menu
              mode="inline"
              className={classes.menu}
              selectedKeys={[location.pathname]}
            >
              <SubMenu
                title={
                  <span>
                    <FaIcon name="twitter" />
                    <span>
                      Twitter <Badge count={5} />
                    </span>
                  </span>
                }
              >
                <Menu.Item>
                  <span>аэрофлот</span>
                </Menu.Item>
              </SubMenu>
              <SubMenu title={<span><FaIcon name="facebook-square" /><span>Facebook</span></span>}>
                <Menu.Item>
                  <span>аэрофлот</span>
                </Menu.Item>
              </SubMenu>
              <SubMenu title={<span><FaIcon name="instagram" /><span>Instagram</span></span>}>
                <Menu.Item>
                  <span>аэрофлот</span>
                </Menu.Item>
              </SubMenu>
              <SubMenu title={<span><FaIcon name="square-o" /><span>Неявные упоминания</span></span>}>
                <Menu.Item>
                  <span>аэрофлот</span>
                </Menu.Item>
              </SubMenu>
              <SubMenu title={<span><Icon type="setting" /><span>Справочники и настройки</span></span>}>
                <Menu.Item>
                  <Icon type="team" />
                  <span>Пользователи</span>
                </Menu.Item>
              </SubMenu>
            </Menu>
          </ScrollArea>
        </Sider>
        <Content className={classes.content}>
          <ScrollArea smoothScrolling>
            {children}
          </ScrollArea>
        </Content>
      </Layout>
    </Layout>
  );
}

const styles = theme => ({
  page: {
    height: '100%',
  },

  sider: {
    background: theme.sidebarBackgroundColor,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',

    '& .ant-layout-sider-children': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
    },

    '& .ant-layout-sider-trigger': {
      background: theme.sidebarBackgroundColor,
      color: '#404040',
      fontSize: 14,
      textAlign: 'right',
      paddingRight: 25,
    },
  },

  menu: {
    border: 0,
  },

  header: {
    padding: 0,
    background: theme.headerBackgroundColor,
  },

  trigger: {
    fontSize: '18px',
    lineHeight: '64px',
    padding: '0 16px',
    cursor: 'pointer',
    transition: 'color .3s',

    '&:hover': {
      color: '#108ee9',
    },
  },

  logo: {
    float: 'left',
    width: 250,
  },

  content: {
    boxShadow: `inset 0px 0px 96px -20px ${theme.boxShadowColor}`,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
  },
});

export default compose(
  withState('sidebarCollapsed', 'setSidebarCollapsed', false),
  withHandlers({
    toggleSidebarCollapsed: ({ sidebarCollapsed, setSidebarCollapsed }) => () => {
      setSidebarCollapsed(!sidebarCollapsed);
    },
  }),
  injectStyles(styles),
  pure,
)(App);
