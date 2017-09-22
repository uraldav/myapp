import React from 'react';
import { object, func, bool } from 'prop-types';
import { Layout, Tooltip, Icon } from 'antd';
import { compose, pure, getContext, withHandlers, withState } from 'recompose';
// import ScrollArea from 'react-scrollbar';
import MentionList from './List';
import MentionFilter from './Filter';
import withAsyncDependencies from '../../utils/withAsyncDependencies';
import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import './index.less';

const { Sider, Content } = Layout;

Mention.propTypes = {
  toggleSidebarCollapsed: func.isRequired,
  sidebarCollapsed: bool.isRequired,
};

function Mention({ sidebarCollapsed, toggleSidebarCollapsed }) {
  return (
    <Layout>
      <Content>
        <MentionList />
      </Content>
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
        width={400}
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
