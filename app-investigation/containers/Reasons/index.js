import { object } from 'prop-types';
import { compose, pure, getContext } from 'recompose';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import withAsyncDependencies from 'app-common/utils/withAsyncDependencies';
import injectReducer from 'app-common/utils/injectReducer';
import injectSaga from 'app-common/utils/injectSaga';
import ReasonsComponent from '../../components/Reasons';
import { dataSelector } from './selectors';

const mapStateToProps = createStructuredSelector({
  data: dataSelector,
});


export default compose(
  getContext({
    store: object,
  }),
  withAsyncDependencies(({ store }) =>
    Promise.all([
      import('./ducks'),
      import('./sagas'),
    ]).then(([reducer, saga]) => {
      injectReducer(store, 'reasons', reducer);
      injectSaga(store, saga);
    }),
  ),
  connect(mapStateToProps),
  pure,
)(ReasonsComponent);
