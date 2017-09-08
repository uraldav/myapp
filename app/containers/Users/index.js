import { object } from 'prop-types';
import { compose, pure, withHandlers, getContext } from 'recompose';
import withAsyncDependencies from '../../utils/withAsyncDependencies';
import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import UsersComponent from '../../components/Users/Users';

export default compose(
  getContext({
    store: object,
  }),
  withHandlers({
    setReducer: ({ store }) => injectReducer(store),
    setSaga: ({ store }) => injectSaga(store),
  }),
  withAsyncDependencies(({ setReducer, setSaga }) =>
    Promise.all([
      import('./ducks'),
      import('./sagas'),
    ])
    .then(([reducer, saga]) => {
      setReducer('users', reducer);
      setSaga(saga);
    }),
  ),
  pure,
)(UsersComponent);
