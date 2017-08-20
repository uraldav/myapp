import React from 'react';
import { string, shape, object, func, bool } from 'prop-types';
import { withHandlers, compose, pure } from 'recompose';
import injectStyles from 'react-jss';
import { Button, Row, Form, Input } from 'antd';

const FormItem = Form.Item;

Auth.propTypes = {
  form: object.isRequired,
  submit: func.isRequired,
  classes: shape({
    form: string.isRequired,
    logo: string.isRequired,
    page: string.isRequired,
  }).isRequired,
  error: string,
  loading: bool,
};

Auth.defaultProps = {
  error: null,
  loading: false,
};

function Auth ({
  classes,
  error,
  loading,
  submit,
  form: {
    getFieldDecorator,
  },
}) {
  return (
    <div className={classes.page}>
      <div className={classes.form}>
        <div className={classes.logo}>
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
            <Button type="primary" size="large" onClick={submit} loading={loading}>
              Войти
            </Button>
            <p>
              {
                error &&
                <div>{error}</div>
              }
            </p>
          </Row>

        </form>
      </div>
    </div>
  );
}

const styles = {
  page: {
    display: 'flex',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    width: '320px',
    height: '320px',
    padding: '36px',
    boxShadow: '0 0 100px rgba(0, 0, 0, 0.08)',

    '& button': {
      width: '100%',
    },

    '& p': {
      color: 'rgb(204, 204, 204)',
      textAlign: 'center',
      marginTop: '16px',

      '& span': {
        '&:first-child': {
          marginRight: '16px',
        },
      },
    },
  },
  logo: {
    textAlign: 'center',
    height: '40px',
    lineHeight: '40px',
    cursor: 'pointer',
    marginBottom: '24px',

    '& img': {
      width: '40px',
      marginRight: '8px',
    },

    '& span': {
      verticalAlign: 'text-bottom',
      fontSize: '16px',
      textTransform: 'uppercase',
      display: 'inline-block',
    },
  },
};

export default compose(
  injectStyles(styles),
  Form.create(),
  withHandlers({
    submit: ({ form, onSubmit }) => () => {
      form.validateFieldsAndScroll((errors, values) => {
        if (errors) {
          return;
        }
        onSubmit({ values });
      });
    },
  }),
  pure,
)(Auth);
