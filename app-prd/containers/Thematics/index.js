import React from 'react';
import { Card, Tabs } from 'antd';
import { compose, pure } from 'recompose';
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

export default compose(pure)(Thematics);
