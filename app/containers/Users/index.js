import { object } from 'prop-types';
import { compose, pure, getContext } from 'recompose';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import withAsyncDependencies from '../../utils/withAsyncDependencies';
import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import UsersComponent from '../../components/Users/Users';
import { editableUserRecordSelector, dataSelector } from './selectors';
import {
  addUser,
  changeEditableUserRecord,
  deleteUserRequest,
  saveUserRequest,
} from './ducks';

const mapStateToProps = createStructuredSelector({
  editableUserRecord: editableUserRecordSelector,
  data: dataSelector,
});

const mapDispatchToProps = {
  onChangeEditableRecord: changeEditableUserRecord,
  onAdd: addUser,
  onDelete: deleteUserRequest,
  onSave: saveUserRequest,
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
      injectReducer(store, 'users', reducer);
      injectSaga(store, saga);
    }),
  ),
  connect(mapStateToProps, mapDispatchToProps),
  pure,
)(UsersComponent);
