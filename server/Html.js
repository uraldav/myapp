/* eslint react/no-danger: 0 */

import React from 'react';
import { object, node } from 'prop-types';
import ReactDOM from 'react-dom/server';
import serialize from 'serialize-javascript';
import Helmet from 'react-helmet';

Html.propTypes = {
  assets: object.isRequired,
  component: node.isRequired,
  store: object.isRequired,
};

export default function Html({
  assets,
  component,
  store,
}) {
  const head = Helmet.rewind();

  return (
    <html lang="ru">
      <head>
        {head.base.toComponent()}
        {head.title.toComponent()}
        {head.meta.toComponent()}
        {head.link.toComponent()}
        {head.script.toComponent()}
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {
          Object.keys(assets.styles).map(style => (
            <link
              href={assets.styles[style]}
              media="screen, projection"
              rel="stylesheet"
              type="text/css"
              charSet="UTF-8"
            />
          ))
        }
      </head>
      <body>
        <div id="content" dangerouslySetInnerHTML={{ __html: ReactDOM.renderToString(component) }} />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__REDUX_INITIAL_STATE__=${serialize(store.getState())};`,
          }}
          charSet="UTF-8"
        />
        <script src={assets.javascript.main} charSet="UTF-8" />
      </body>
    </html>
  );
}
