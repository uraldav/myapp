import React from 'react';
import { object, func, bool } from 'prop-types';
import { Helmet } from 'react-helmet';
import { Layout, Tooltip, Icon } from 'antd';
import { compose, pure, getContext, withHandlers, withState } from 'recompose';
import withAsyncDependencies from 'app-common/utils/withAsyncDependencies';
import injectReducer from 'app-common/utils/injectReducer';
import injectSaga from 'app-common/utils/injectSaga';
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
    <Layout>
      <Helmet>
        <script
          src="//connect.facebook.net/ru_RU/sdk.js#xfbml=1&amp;version=v2.5"
          async
        />
      </Helmet>
      <Content>
        <MentionList />
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
          <MentionFilter />
        )}
      </Sider>
    </Layout>
  );
}

export default compose(
  withState('sidebarCollapsed', 'setSidebarCollapsed', false),
  getContext({
    store: object,
  }),
  withAsyncDependencies(({ store }) =>
    Promise.all([
      import('./ducks'),
      import('./sagas'),
    ]).then(([reducer, saga]) => {
      injectReducer(store, 'mentions', reducer);
      injectSaga(store, saga);
    }),
  ),
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
