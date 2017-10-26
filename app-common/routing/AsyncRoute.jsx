import React from 'react';
import { object, func, oneOfType } from 'prop-types';
import { Route } from 'react-router-dom';
import { compose, pure, withState, withHandlers } from 'recompose';

AsyncRoute.propTypes = {
  requireComponent: func.isRequired,
  renderComponent: func.isRequired,
  Component: oneOfType([func, object]),
};

AsyncRoute.defaultProps = {
  Component: null,
};

function AsyncRoute({
  requireComponent,
  renderComponent,
  Component,
  ...otherProps
}) {
  const RouteComponent = Component ? Component.default || Component : null;

  return (
    <Route
      {...otherProps}
      render={(match) => {
        if (!RouteComponent) {
          renderComponent(requireComponent, match);
        }

        return RouteComponent ? <RouteComponent {...match} /> : <div />;
      }}
    />
  );
}

export default compose(
  withState('Component', 'setComponent', null),
  withHandlers({
    renderComponent: ({ setComponent }) => (requireComponent, match) => {
      requireComponent(match).then((component) => {
        setComponent(component);
      });
    },
  }),
  pure,
)(AsyncRoute);
