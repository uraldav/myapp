import { withState, compose, createEagerFactory, lifecycle } from 'recompose';

const withAsyncDependencies = input => (BaseComponent) => {
  const factory = createEagerFactory(BaseComponent);

  function WithAsyncDependencies(props) {
    if (props.loadingDependencies === false) {
      return factory(props);
    }

    return null;
  }

  function run(props) {
    if (props.routeKey !== props.location.key) {
      props.setRouteKey(props.location.key);
      props.setLoadingDependencies(true);
      input(props).then(() => {
        props.setLoadingDependencies(false);
      });
    }
  }

  return compose(
    withState('loadingDependencies', 'setLoadingDependencies', null),
    withState('routeKey', 'setRouteKey', null),
    lifecycle({
      componentWillMount() {
        run(this.props);
      },
      componentWillUpdate(props) {
        run(props);
      },
    }),
  )(WithAsyncDependencies);
};

export default withAsyncDependencies;
