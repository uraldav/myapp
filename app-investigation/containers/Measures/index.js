import { object } from 'prop-types';
import { compose, pure, getContext } from 'recompose';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import withAsyncDependencies from 'app-common/utils/withAsyncDependencies';
import injectReducer from 'app-common/utils/injectReducer';
import injectSaga from 'app-common/utils/injectSaga';
import MeasuresComponent from '../../components/Measures';
import { dataSelector, editableRecordSelector } from './selectors';
import {
  addMeasure,
  changeEditableRecord,
  deleteRequest,
  saveRequest,
} from './ducks';

const mapStateToProps = createStructuredSelector({
  data: dataSelector,
  editableRecord: editableRecordSelector,
});

const mapDispatchToProps = {
  onChangeEditableRecord: changeEditableRecord,
  onAdd: addMeasure,
  onDelete: deleteRequest,
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
      injectReducer(store, 'measures', reducer);
      injectSaga(store, saga);
    }),
  ),
  connect(mapStateToProps, mapDispatchToProps),
  pure,
)(MeasuresComponent);
