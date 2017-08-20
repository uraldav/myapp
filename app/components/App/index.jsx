import React from 'react';
import { func, bool, shape, string, any } from 'prop-types';
import { compose, pure, withHandlers, withState } from 'recompose';
import injectStyles from 'react-jss';
import { Layout, Menu, Icon, Badge, Tooltip } from 'antd';
import FaIcon from 'react-fontawesome';

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

App.propTypes = {
  children: any.isRequired,
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
          <Menu mode="inline" className={classes.menu}>
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
        </Sider>
        <Content className={classes.content}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}

const styles = {
  page: {
    height: '100%',
  },

  sider: {
    background: '#fff',

    '& .ant-layout-sider-trigger': {
      background: '#fff',
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
    background: '#fff',
    // boxShadow: '0px 10px 40px 0 rgba(0, 0, 0, 0.05)',
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
  },
};

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
