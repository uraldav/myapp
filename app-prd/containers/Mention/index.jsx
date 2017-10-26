import React from 'react';
import { func, bool } from 'prop-types';
import { Helmet } from 'react-helmet';
import { Layout, Tooltip, Icon } from 'antd';
import { compose, pure, withHandlers, withState } from 'recompose';
import ScrollArea from 'react-scrollbar';
import MentionList from './List';
import MentionFilter from './Filter';
import './index.less';

const { Sider, Content } = Layout;

Mention.propTypes = {
  toggleSidebarCollapsed: func.isRequired,
  sidebarCollapsed: bool.isRequired,
};

function Mention({ sidebarCollapsed, toggleSidebarCollapsed }) {
  return (
    <Layout styleName="layout">
      <Helmet>
        <script
          src="//connect.facebook.net/ru_RU/sdk.js#xfbml=1&amp;version=v2.5"
          async
        />
      </Helmet>
      <Content styleName="content">
        <ScrollArea smoothScrolling>
          <MentionList />
        </ScrollArea>
      </Content>
      <Sider
        trigger={
          <Tooltip
            title={sidebarCollapsed ? 'Развернуть меню' : 'Свернуть меню'}
            placement="right"
          >
            <Icon type={sidebarCollapsed ? 'menu-fold' : 'menu-unfold'} />
          </Tooltip>
        }
        collapsible
        collapsed={sidebarCollapsed}
        onCollapse={toggleSidebarCollapsed}
        styleName="sider"
        width={250}
      >
        {sidebarCollapsed ? (
          <div>
            <div styleName="vertical">ф</div>
            <div styleName="vertical">и</div>
            <div styleName="vertical">л</div>
            <div styleName="vertical">ь</div>
            <div styleName="vertical">т</div>
            <div styleName="vertical">р</div>
            <div styleName="vertical">ы</div>
          </div>
        ) : (
          <ScrollArea smoothScrolling>
            <MentionFilter />
          </ScrollArea>
        )}
      </Sider>
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
)(Mention);
