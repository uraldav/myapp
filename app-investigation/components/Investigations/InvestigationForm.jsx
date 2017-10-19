import React from 'react';
import { object, func } from 'prop-types';
import {
  Form,
  Button,
  Icon,
  Row,
  Col,
  Input,
  Select,
  DatePicker,
  TimePicker,
  Checkbox,
} from 'antd';
import { compose, pure } from 'recompose';
import './InvestigationForm.less';

InvestigationForm.propTypes = {
  data: object,
  form: object.isRequired,
};

InvestigationForm.defaultProps = {
  data: null,
};

function InvestigationForm({ data, form: { getFieldDecorator } }) {
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
        <Col span={8}>
          <h3 styleName="form-group-header">Основная информация</h3>
          <Form.Item {...formItemLayout} label="Статус">
            {getFieldDecorator('status')(
              <Select>
                <Select.Option value="open">Открыто</Select.Option>
                <Select.Option value="inProgress">В работе</Select.Option>
                <Select.Option value="rejected">Отклонено</Select.Option>
                <Select.Option value="externalRequest">
                  Внешний запрос
                </Select.Option>
                <Select.Option value="completed">Завершено</Select.Option>
                <Select.Option value="closed">Закрыто</Select.Option>
                <Select.Option value="reopenedWithNotice">
                  Переоткрыто с уведомлением
                </Select.Option>
                <Select.Option value="reopened">Переоткрыто</Select.Option>
                <Select.Option value="actionsTaken">Меры приняты</Select.Option>
              </Select>,
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="Вид">
            {getFieldDecorator('type')(
              <Select>
                <Select.Option value="investigation">
                  Расследование
                </Select.Option>
                <Select.Option value="gratitude">Благодарность</Select.Option>
                <Select.Option value="proposal">Предложение</Select.Option>
              </Select>,
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="Идентификатор">
            {getFieldDecorator('id')(<Input />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="ID связанного SR">
            {getFieldDecorator('sr_id')(<Input />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="Дата открытия">
            {getFieldDecorator('open_date')(
              <div styleName="date-time-wrapper">
                <DatePicker />
                <TimePicker placeholder="Время" />
              </div>,
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="СПО">
            {getFieldDecorator('dep_name')(<Input />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="СПО (инициатор)">
            {getFieldDecorator('spo_employee')(<Input />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="Дата закрытия">
            {getFieldDecorator('close_date')(
              <div styleName="date-time-wrapper">
                <DatePicker />
              </div>,
            )}
          </Form.Item>
        </Col>
        <Col span={8}>
          <h3 styleName="form-group-header">Информация по расследованию</h3>
          <Form.Item
            labelCol={{
              sm: { span: 11 },
            }}
            wrapperCol={{
              sm: { span: 13 },
            }}
            colon=""
            label={<Button>Назначить на себя</Button>}
          >
            {getFieldDecorator('critical')(<Checkbox>Критичность</Checkbox>)}
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label={
              <span>
                Плановая дата{' '}
                <span style={{ display: 'inline-block', width: '7px' }} />{' '}
                завершения
              </span>
            }
            colon={false}
          >
            {getFieldDecorator('plannedCompletionDate')(
              <div styleName="date-time-wrapper">
                <DatePicker />
                <TimePicker placeholder="Время" />
              </div>,
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="СПР">
            {getFieldDecorator('spr_name')(<Input />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="Исполнитель в СПР">
            {getFieldDecorator('user_id')(<Input />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="Дата отклонения">
            {getFieldDecorator('rejected_date')(
              <div styleName="date-time-wrapper">
                <DatePicker />
              </div>,
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="Дата завершения">
            {getFieldDecorator('completed_date')(
              <div styleName="date-time-wrapper">
                <DatePicker />
              </div>,
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="Типовая причина">
            {getFieldDecorator('reason')(<Input />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="Основное СПП">
            {getFieldDecorator('spp_name')(<Input />)}
          </Form.Item>
        </Col>
        <Col span={8}>
          <h3 styleName="form-group-header">Комментарии</h3>
          <Form.Item
            styleName="textarea-field"
            label="Комментарий (запрос СПО)"
            colon=""
          >
            {getFieldDecorator('comment_request')(<Input.TextArea />)}
          </Form.Item>
          <Form.Item
            styleName="textarea-field"
            label="Комментарий (ответ СПР)"
            colon=""
          >
            {getFieldDecorator('comment_response')(<Input.TextArea />)}
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
      sm: { span: 10 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 14 },
    },
  };
}

export default compose(Form.create(), pure)(InvestigationForm);
