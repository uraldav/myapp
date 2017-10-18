import { object } from 'prop-types';
import { compose, pure, getContext } from 'recompose';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import withAsyncDependencies from 'app-common/utils/withAsyncDependencies';
import injectReducer from 'app-common/utils/injectReducer';
import injectSaga from 'app-common/utils/injectSaga';
import MassMeasuresComponent from '../../components/MassMeasures';
import {
  dataSelector,
  editableMeasureSelector,
} from './selectors';
import {
  selectEditableMeasure,
} from './ducks';

const mapStateToProps = createStructuredSelector({
  measures: dataSelector,
  selectedMeasure: editableMeasureSelector,
});

const mapDispatchToProps = {
  onMeasureClick: selectEditableMeasure,
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
      injectReducer(store, 'massMeasures', reducer);
      injectSaga(store, saga);
    }),
  ),
  connect(mapStateToProps, mapDispatchToProps),
  pure,
)(MassMeasuresComponent);
