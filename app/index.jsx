import 'antd/dist/antd.css';
import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import './style/index.less';
import configureStore from './store/configureStore';
import Root from './Root';

const rootEl = document.getElementById('react-root');
const history = createHistory();
const store = configureStore();

const render = () => {
  ReactDOM.render(
    <Root store={store} history={history} />,
    rootEl,
  );
};

render();

if (module.hot) {
  module.hot.accept('./Root', () => {
    setImmediate(() => {
      ReactDOM.unmountComponentAtNode(rootEl);
      render();
    });
  });
}
