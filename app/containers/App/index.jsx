import React from 'react';
import { object, func } from 'prop-types';
import { compose, withProps, getContext } from 'recompose';
import App from '../../components/App';
import AsyncRoute from '../../routing/AsyncRoute';
import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';

NestedRoutes.propTypes = {
  match: object.isRequired,
  setReducer: func.isRequired,
  setSaga: func.isRequired,
};

function NestedRoutes({
  match,
  setReducer,
  setSaga,
}) {
  return (
    <div>
      <AsyncRoute
        exact
        path={match.url}
        requireComponent={() => {
          return import('../../containers/Mention/List');
        }}
        onBeforeRender={() => {
          return Promise.all([
            import('../../containers/Mention/ducks'),
            import('../../containers/Mention/sagas'),
          ])
          .then(([reducer, saga]) => {
            setReducer('mentions', reducer);
            setSaga(saga);
          });
        }}
      />
    </div>
  );
}

export default compose(
  getContext({
    store: object,
  }),
  withProps(props => ({
    children: NestedRoutes({
      ...props,
      setReducer: injectReducer(props.store),
      setSaga: injectSaga(props.store),
    }),
  })),
)(App);
