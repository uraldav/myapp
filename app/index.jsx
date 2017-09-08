import 'antd/dist/antd.css';
import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import './style/icons/fa-adapter.less';
import configureStore from './store/configureStore';
import Root from './Root';
import getReactContainer from './utils/getReactContainer';

const rootEl = getReactContainer('react-root');
const history = createHistory();
const store = configureStore();

const renderApp = () => {
  ReactDOM.render(
    <Root store={store} history={history} />,
    rootEl,
  );
};

renderApp();

if (module.hot) {
  module.hot.accept('./Root', () => {
    setImmediate(() => {
      ReactDOM.unmountComponentAtNode(rootEl);
      renderApp();
    });
  });
}