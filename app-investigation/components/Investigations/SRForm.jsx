import React from 'react';
import { object } from 'prop-types';
import { compose, pure } from 'recompose';
import { Form, Button, Icon, Input, Row, Col } from 'antd';
import './SRForm.less';

SRForm.propTypes = {
  data: object,
  form: object.isRequired,
};

SRForm.defaultProps = {
  data: null,
};

function SRForm({ data, form: { getFieldDecorator } }) {
  const formItemLayout = getFormItemLayout();

  return (
    <Form styleName="form">
      <div styleName="toolbar">
        <Button>
          <Icon type="save" />
        </Button>
        <Button>
          <Icon type="printer" />
        </Button>
      </div>
      <Row gutter={16}>
        <Col span={12}>
          <h3 styleName="form-group-header">General Information</h3>
          <Form.Item {...formItemLayout} label="Status">
            {getFieldDecorator('status')(<Input />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="Channel">
            {getFieldDecorator('channel')(<Input />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="Opened">
            {getFieldDecorator('opened')(<Input />)}
          </Form.Item>
          <Form.Item styleName="textarea-field" label="Body" colon="">
            {getFieldDecorator('body')(<Input.TextArea />)}
          </Form.Item>
        </Col>
        <Col span={12}>
          <h3 styleName="form-group-header">Primary requester</h3>
          <Form.Item {...formItemLayout} label="Member">
            {getFieldDecorator('member')(<Input />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="Last Name">
            {getFieldDecorator('last_name')(<Input />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="First Name">
            {getFieldDecorator('first_name')(<Input />)}
          </Form.Item>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                labelCol={{
                  sm: { span: 8 },
                }}
                wrapperCol={{
                  sm: { span: 16 },
                }}
                label="Flight #"
                colon=""
              >
                {getFieldDecorator('flight')(<Input />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                labelCol={{
                  sm: { span: 4 },
                }}
                wrapperCol={{
                  sm: { span: 20 },
                }}
                label="Date"
                colon=""
              >
                {getFieldDecorator('Date')(<Input />)}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                labelCol={{
                  sm: { span: 8 },
                }}
                wrapperCol={{
                  sm: { span: 16 },
                }}
                label="PNR #"
                colon=""
              >
                {getFieldDecorator('pnr')(<Input />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                labelCol={{
                  sm: { span: 4 },
                }}
                wrapperCol={{
                  sm: { span: 20 },
                }}
                label="Ticket"
                colon=""
              >
                {getFieldDecorator('ticket')(<Input />)}
              </Form.Item>
            </Col>
          </Row>
          <Form.Item styleName="textarea-field" label="Description" colon="">
            {getFieldDecorator('description')(<Input.TextArea />)}
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}

function getFormItemLayout() {
  return {
    colon: '',
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 20 },
    },
  };
}

export default compose(Form.create(), pure)(SRForm);
