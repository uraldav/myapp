import 'antd/dist/antd.css';
import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import configureStore from './store/configureStore';
import Root from './Root';
import getReactContainer from './utils/getReactContainer';

const rootEl = getReactContainer('react-root');
const history = createHistory();
const store = configureStore(undefined, history);

const renderApp = () => {
  ReactDOM.render(<Root store={store} history={history} />, rootEl);
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
