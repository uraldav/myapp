import React from 'react';
import { object, func, oneOfType } from 'prop-types';
import { Route } from 'react-router-dom';
import { compose, withState, withHandlers } from 'recompose';

AsyncRoute.propTypes = {
  requireComponent: func.isRequired,
  renderComponent: func.isRequired,
  Component: oneOfType([func, object]),
  onBeforeRender: func,
};

AsyncRoute.defaultProps = {
  Component: null,
  onBeforeRender: Component => Promise.resolve(Component),
};

function AsyncRoute({
  requireComponent,
  renderComponent,
  Component,
  onBeforeRender,
  ...otherProps
}) {
  const RouteComponent = Component ? Component.default || Component : null;

  return (
    <Route
      {...otherProps}
      render={(match) => {
        if (!RouteComponent) {
          renderComponent(requireComponent, onBeforeRender);
        }

        return RouteComponent ? <RouteComponent {...match} /> : <div />;
      }}
    />
  );
}

export default compose(
  withState('Component', 'setComponent', null),
  withHandlers({
    renderComponent: ({ setComponent }) => (requireComponent, onBeforeRender) => {
      requireComponent()
      .then((Component) => {
        onBeforeRender(Component)
        .then(component => setComponent(component));
      });
    },
  }),
)(AsyncRoute);
