import React from 'react';
import { bool, object, arrayOf, shape } from 'prop-types';
import { compose, pure } from 'recompose';
import { Card, Input, Icon, Button, Pagination, Tabs } from 'antd';
import './Investigation.less';

import InvestigationList, {
  dataPropTypes as investigationPropTypes,
} from './InvestigationList';
import InvestigationForm from './InvestigationForm';
import SRForm from './SRForm';
import SRAttachmentList from './SRAttachmentList';
import RevisionHistory from './RevisionHistory';
import ClassificationList from './ClassificationList';
import CausesList from './CausesList';
import MeasureList from './MeasureList';
import AttachmentsList from './AttachmentsList';

Investigations.propTypes = {
  loading: bool,
  data: investigationPropTypes,
  selectedInvestigation: object,
};

Investigations.defaultProps = {
  loading: false,
  data: [],
  selectedInvestigation: null,
};

function Investigations({ loading, data, selectedInvestigation }) {
  return (
    <Card
      title={
        <div styleName="header">
          <Button>
            <Icon type="filter" />
          </Button>
          <span className="ant-divider" />
          <Input.Search placeholder="поиск по ID расследования или по ID связанного SR" />
          <span className="ant-divider" />
          <Pagination defaultCurrent={1} total={50} />
        </div>
      }
    >
      <div styleName="body">
        <InvestigationList data={data} />
        <Tabs defaultActiveKey="1" styleName="tabs">
          <Tabs.TabPane tab="Расследование" key="1">
            <InvestigationForm />
            <Tabs defaultActiveKey="1">
              <Tabs.TabPane tab="Классификация" key="1">
                <ClassificationList />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Причины" key="2">
                <CausesList />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Меры" key="3">
                <MeasureList />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Вложения" key="4">
                <AttachmentsList />
              </Tabs.TabPane>
            </Tabs>
          </Tabs.TabPane>
          <Tabs.TabPane tab="SR (1-200021022)" key="2">
            <SRForm />
            <Tabs defaultActiveKey="1">
              <Tabs.TabPane key="1" tab="Attachments">
                <SRAttachmentList />
              </Tabs.TabPane>
            </Tabs>
          </Tabs.TabPane>
          <Tabs.TabPane tab="История изменений" key="3">
            <RevisionHistory />
          </Tabs.TabPane>
        </Tabs>
      </div>
    </Card>
  );
}

export default compose(pure)(Investigations);
