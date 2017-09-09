import { object } from 'prop-types';
import { compose, getContext, pure } from 'recompose';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import withAsyncDependencies from '../../utils/withAsyncDependencies';
import Auth from '../../components/Auth';
import { request } from './ducks';
import { errorSelector, loadingSelector } from './selectors';

const mapStateToProp = createStructuredSelector({
  error: errorSelector,
  loading: loadingSelector,
});

const mapDispatchToProps = {
  onSubmit: request,
};

export default compose(
  getContext({
    store: object,
  }),
  withAsyncDependencies(({ store }) =>
    Promise.all([
      import('./ducks'),
      import('./sagas'),
    ]).then(([reducer, saga]) => {
      injectReducer(store, 'auth', reducer);
      injectSaga(store, saga);
    }),
  ),
  connect(mapStateToProp, mapDispatchToProps),
  pure,
)(Auth);
