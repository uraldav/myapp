// /* eslint no-console: 0, no-underscore-dangle: 0 */
//
// import Express from 'express';
// import React from 'react';
// import ReactDOM from 'react-dom/server';
// import PrettyError from 'pretty-error';
// import http from 'http';
// import { match } from 'react-router';
// import { syncHistoryWithStore } from 'react-router-redux';
// import createMemoryHistory from 'history/createMemoryHistory';
// import { Provider } from 'react-redux';
// import Html from './Html';
//
// const pretty = new PrettyError();
// const app = new Express();
// const server = new http.Server(app);
//
// app.use((req, res) => {
//   if (global.__DEVELOPMENT__) {
//     global.webpackIsomorphicTools.refresh();
//   }
//   const client = new ApiClient(req);
//   const memoryHistory = createMemoryHistory(req.originalUrl);
//   const store = createStore(memoryHistory, client);
//   const history = syncHistoryWithStore(memoryHistory, store);
//
//   match(
//       { history, routes: getRoutes(store), location: req.originalUrl },
//       (error, redirectLocation, renderProps) => {
//     if (redirectLocation) {
//       res.redirect(redirectLocation.pathname + redirectLocation.search);
//     } else if (error) {
//       console.error('ROUTER ERROR:', pretty.render(error));
//       res.status(500);
//       hydrateOnClient();
//     } else if (renderProps) {
//       loadOnServer({...renderProps, store, helpers: { client }}).then(() => {
//         const component = (
//           <Provider store={store} key="provider">
//             <ReduxAsyncConnect {...renderProps} />
//           </Provider>
//         );
//
//         res.status(200);
//
//         global.navigator = { userAgent: req.headers['user-agent'] };
//
//         res.send(
//           `<!doctype html>${
//             ReactDOM.renderToString(
//               <Html
//                 assets={global.webpackIsomorphicTools.assets()}
//                 component={component}
//                 store={store}
//               />,
//             )}`,
//         );
//       });
//     } else {
//       res.status(404).send('Not found');
//     }
//   });
// });
//
// server.listen(8080, (err) => {
//   if (err) {
//     console.error(err);
//   }
//   console.info('----\n==> ✅  Server is running');
// });
