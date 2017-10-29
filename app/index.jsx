import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import { Map } from 'immutable';
import configureStore from 'base/store/configureStore';
import getReactContainer from 'base/utils/getReactContainer';
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
