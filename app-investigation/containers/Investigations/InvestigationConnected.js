import { compose, pure, getContext } from 'recompose';
import { object } from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators } from 'redux';
import withAsyncDependencies from 'app-common/utils/withAsyncDependencies';
import injectReducer from 'app-common/utils/injectReducer';
import injectSaga from 'app-common/utils/injectSaga';
import Investigations from '../../components/Investigations/Investigations';
import { dataSelector, selectedInvestigationSelector } from './selectors';
import { selectInvestigation } from './ducks';

const mapStateToProps = createStructuredSelector({
  data: dataSelector,
  selectedInvestigation: selectedInvestigationSelector,
});

const mapDispatchToProps = {
  onSelectInvestigation: selectInvestigation,
};

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
  connect(mapStateToProps, mapDispatchToProps),
)(Investigations);
