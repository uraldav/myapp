import 'babel-polyfill';
import 'react-hot-loader/patch';
import 'antd/dist/antd.css';
import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import configureStore from './store/configureStore';
import Root from './Root';

const history = createHistory();
const store = configureStore();

const render = (RootComponent) => {
  ReactDOM.render(
    <RootComponent store={store} history={history} />,
    document.getElementById('react-root'),
  );
};

render(Root);

/* eslint-disable */
if (module.hot) {
  module.hot.accept([
    './utils/getReactContainer',
    './store/configureStore',
    './Root'
  ], () => {
    render(require('./Root'));
  });
}
/* eslint-enable */
