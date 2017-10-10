import 'antd/dist/antd.css';
import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import { Map } from 'immutable';
import configureStore from 'app-common/store/configureStore';
import getReactContainer from 'app-common/utils/getReactContainer';
import Root from './Root';

const rootEl = getReactContainer('react-root');
const history = createHistory();
const store = configureStore(Map(), history);

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
