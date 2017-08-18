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
  onBeforeRender: next => next(),
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
      render={(matchProps) => {
        if (!RouteComponent) {
          renderComponent(requireComponent, onBeforeRender);
        }

        return RouteComponent ? <RouteComponent {...matchProps} /> : <div />;
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
        onBeforeRender(() => {
          setComponent(Component);
        });
      });
    },
  }),
)(AsyncRoute);
