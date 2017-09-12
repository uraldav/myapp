import { object } from 'prop-types';
import { compose, pure, getContext } from 'recompose';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import withAsyncDependencies from '../../utils/withAsyncDependencies';
import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import UserRolesComponent from '../../components/UserRoles/UserRoles';
import { permissionsSelector, rolesSelector, editableRecordSelector } from './selectors';
import { selectEditableRecord } from './ducks';

const mapStateToProps = createStructuredSelector({
  roles: rolesSelector,
  editableRecord: editableRecordSelector,
  permissions: permissionsSelector,
});

const mapDispatchToProps = {
  onUserRoleClick: selectEditableRecord,
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
      injectReducer(store, 'userRoles', reducer);
      injectSaga(store, saga);
    }),
  ),
  connect(mapStateToProps, mapDispatchToProps),
  pure,
)(UserRolesComponent);
