import {
  withState,
  compose,
  createEagerFactory,
} from 'recompose';

const withAsyncDependencies = input => (BaseComponent) => {
  const factory = createEagerFactory(BaseComponent);

  function WithAsyncDependencies(props) {
    if (props.loadingDependencies === null) {
      input(props)
      .then(() => {
        props.setLoadingDependencies(false);
      });
      props.setLoadingDependencies(true);
    }

    if (props.loadingDependencies === false) {
      return factory(props);
    }

    return null;
  }

  return compose(
    withState('loadingDependencies', 'setLoadingDependencies', null),
  )(WithAsyncDependencies);
};

export default withAsyncDependencies;
