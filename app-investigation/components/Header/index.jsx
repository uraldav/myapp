import React from 'react';
import { Layout, Button } from 'antd';
import { Route, Link } from 'react-router-dom';
import FaIcon from 'react-fontawesome';
import logo from 'app-common/assets/logo.svg';
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
        <Route exact path="/" render={() => <h1>Рабочий стол</h1>} />
        <Route path="/mass_measures" render={() => <h1>Массовые меры</h1>} />
        <Route path="/users" render={() => <h1>Пользователи</h1>} />
        <Route path="/user_roles" render={() => <h1>Роли пользователей</h1>} />
        <Route path="/departments" render={() => <h1>Подразделения</h1>} />
        <Route path="/reasons" render={() => <h1>Причины</h1>} />
      </div>
    </Layout.Header>
  );
}

export default Header;
