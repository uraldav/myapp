import { object } from 'prop-types';
import { createEagerFactory, mapProps, compose, getContext } from 'recompose';
import { pick } from 'ramda';
import { permissionsSelector } from '../store/globalSelectors';

const withPermissions = permissions => (Component) => {
  const factory = createEagerFactory(Component);

  function WithPermissions(props) {
    const permissionsState = permissionsSelector(props.store.getState());
    return factory({
      ...props,
      permissions: pick(props.permissions, permissionsState), // TODO: correct permissions values
    });
  }

  return compose(
    getContext({
      store: object,
    }),
    mapProps(props => ({
      ...props,
      permissions,
    })),
  )(WithPermissions);
};

export default withPermissions;
