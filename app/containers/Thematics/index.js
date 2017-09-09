import React from 'react';
import { object } from 'prop-types';
import { Card, Tabs } from 'antd';
import { compose, pure, getContext } from 'recompose';
import withAsyncDependencies from '../../utils/withAsyncDependencies';
import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import ConnectedInputThematics from './ConnectedInputThematics';
import ConnectedModelThematics from './ConnectedModelThematics';

const TabPane = Tabs.TabPane;

function Thematics() {
  return (
    <Card>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Тематики ввода" key="1">
          <ConnectedInputThematics />
        </TabPane>
        <TabPane tab="Тематики модели" key="2">
          <ConnectedModelThematics />
        </TabPane>
      </Tabs>
    </Card>
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
      injectReducer(store, 'thematics', reducer);
      injectSaga(store, saga);
    }),
  ),
  pure,
)(Thematics);
