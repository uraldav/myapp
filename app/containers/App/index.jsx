import React from 'react';
import { object } from 'prop-types';
import { compose, pure, withProps } from 'recompose';
import App from '../../components/App';
import AsyncRoute from '../../routing/AsyncRoute';

NestedRoutes.propTypes = {
  match: object.isRequired,
};

function NestedRoutes({
  match,
}) {
  return (
    <div>
      <AsyncRoute
        exact
        path={match.url}
        requireComponent={() => {
          return import('../../containers/Mention/Main');
        }}
      />
    </div>
  );
}

export default compose(
  withProps(props => ({ children: NestedRoutes(props) })),
  pure,
)(App);
