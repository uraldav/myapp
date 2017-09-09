import React from 'react';
import { object } from 'prop-types';
import { Layout } from 'antd';
import { compose, pure, getContext } from 'recompose';
import MentionList from './List';
import MentionFilter from './Filter';
import withAsyncDependencies from '../../utils/withAsyncDependencies';
import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import './index.less';

const { Sider, Content } = Layout;

function Mention() {
  return (
    <Layout>
      <Content>
        <MentionList />
      </Content>
      <Sider width={250} styleName="sider">
        <MentionFilter />
      </Sider>
    </Layout>
  );
}

export default compose(
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
  pure,
)(Mention);
