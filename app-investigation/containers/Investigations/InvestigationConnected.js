import { compose, pure, getContext } from 'recompose';
import { object } from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import withAsyncDependencies from 'app-common/utils/withAsyncDependencies';
import injectReducer from 'app-common/utils/injectReducer';
import injectSaga from 'app-common/utils/injectSaga';
import Investigations from '../../components/Investigations/Investigations';
import { dataSelector } from './selectors';

const mapStateToProps = createStructuredSelector({
  data: dataSelector,
});

export default compose(
  pure,
  getContext({
    store: object,
  }),
  withAsyncDependencies(({ store }) =>
    Promise.all([
      import('./ducks'),
      import('./sagas'),
    ]).then(([reducer, saga]) => {
      injectReducer(store, 'investigations', reducer);
      injectSaga(store, saga);
    }),
  ),
  connect(mapStateToProps),
)(Investigations);
