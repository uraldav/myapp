import React from 'react';
import { Layout, Button } from 'antd';
import { Route, Link } from 'react-router-dom';
import FaIcon from 'react-fontawesome';
import logo from './logo.svg';
import './index.less';

function Header() {
  return (
    <Layout.Header styleName="header">
      <div styleName="logo">
        <Link to="/" styleName="logo-link">
          <img src={logo} alt="Аэрофлот" styleName="logo-img" />
        </Link>
      </div>
      <div styleName="title">
        <Route
          exact
          path="/"
          render={() => (
            <div styleName="buttons">
              <Button shape="circle" icon="inbox" size="large" />
              <Button shape="circle" size="large">
                <FaIcon name="bookmark-o" />
              </Button>
              <Button shape="circle" icon="exclamation" size="large" />
              <Button shape="circle" icon="search" size="large" />
            </div>
          )}
        />
        <Route path="/users" render={() => <h1>Пользователи</h1>} />
        <Route path="/thematics" render={() => <h1>Тематики и словари</h1>} />
        <Route path="/user_roles" render={() => <h1>Роли пользователей</h1>} />
        <Route
          path="/priority_coefficients"
          render={() => <h1>Коэффициенты для приоретизации</h1>}
        />
      </div>
    </Layout.Header>
  );
}

export default Header;
