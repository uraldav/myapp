import React from 'react';
import { object } from 'prop-types';
import { Layout } from 'antd';
import { compose, pure, withHandlers, getContext } from 'recompose';
import MentionList from './List';
import MentionFilter from './Filter';
import withAsyncDependencies from '../../utils/withAsyncDependencies';
import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import './Main.less';

const { Sider, Content } = Layout;

function MentionMain() {
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
  withHandlers({
    setReducer: ({ store }) => injectReducer(store),
    setSaga: ({ store }) => injectSaga(store),
  }),
  withAsyncDependencies(({ setReducer, setSaga }) =>
    Promise.all([
      import('../../containers/Mention/ducks'),
      import('../../containers/Mention/sagas'),
    ])
    .then(([reducer, saga]) => {
      setReducer('mentions', reducer);
      setSaga(saga);
    }),
  ),
  pure,
)(MentionMain);
