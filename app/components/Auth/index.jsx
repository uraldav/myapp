import React from 'react';
import { string, object, func, bool } from 'prop-types';
import { withHandlers, compose, pure } from 'recompose';
import { Button, Row, Form, Input } from 'antd';
import './index.less';

const FormItem = Form.Item;

Auth.propTypes = {
  form: object.isRequired,
  submit: func.isRequired,
  error: string,
  loading: bool,
};

Auth.defaultProps = {
  error: null,
  loading: false,
};

function Auth({ error, loading, submit, form: { getFieldDecorator } }) {
  return (
    <div styleName="page">
      <div styleName="form">
        <div styleName="logo">
          {/* <img alt={'Логотип аэрофлот'} src="" /> */}
          <span>Аэрофлот</span>
        </div>
        <form>
          <FormItem hasFeedback>
            {getFieldDecorator('login', {
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input size="large" placeholder="Имя пользователя" />)}
          </FormItem>
          <FormItem hasFeedback>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input size="large" type="password" placeholder="Пароль" />)}
          </FormItem>
          <Row>
            <Button
              type="primary"
              size="large"
              onClick={submit}
              loading={loading}
            >
              Войти
            </Button>
            <p>{error && <div>{error}</div>}</p>
          </Row>
        </form>
      </div>
    </div>
  );
}

export default compose(
  Form.create(),
  withHandlers({
    submit: ({ form, onSubmit }) => () => {
      form.validateFieldsAndScroll((errors, values) => {
        if (errors) {
          return;
        }
        onSubmit({ ...values });
      });
    },
  }),
  pure,
)(Auth);
