import { object } from 'prop-types';
import { compose, pure, getContext } from 'recompose';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import withAsyncDependencies from '../../utils/withAsyncDependencies';
import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import PriorityCoefficients from '../../components/PriorityCoefficients';
import { editableRecordSelector, dataSelector } from './selectors';
import { changeEditableRecord, saveRequest } from './ducks';

const mapStateToProps = createStructuredSelector({
  editableRecord: editableRecordSelector,
  data: dataSelector,
});

const mapDispatchToProps = {
  onChangeEditableRecord: changeEditableRecord,
  onSave: saveRequest,
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
      injectReducer(store, 'priorityCoefficients', reducer);
      injectSaga(store, saga);
    }),
  ),
  connect(mapStateToProps, mapDispatchToProps),
  pure,
)(PriorityCoefficients);
