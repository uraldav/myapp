import React from 'react';
import { Layout } from 'antd';
import { Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import './index.less';

function Header() {
  return (
    <Layout.Header styleName="header">
      <div styleName="logo">
        <Link to="/">
          <img src={logo} alt="Аэрофлот" styleName="logo-img" />
        </Link>
      </div>
      <div styleName="title">
        <Route exact path="/" render={() => <h1>Главная</h1>} />
        <Route path="/users" render={() => <h1>Пользователи</h1>} />
        <Route path="/thematics" render={() => <h1>Тематики</h1>} />
        <Route path="/user_roles" render={() => <h1>Роли пользователей</h1>} />
        <Route
          path="/priority_coefficients"
          render={() => <h1>Коэффициенты приоретизации</h1>}
        />
      </div>
    </Layout.Header>
  );
}

export default Header;
