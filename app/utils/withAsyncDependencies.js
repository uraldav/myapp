import {
  withState,
  compose,
  createEagerFactory,
  lifecycle,
} from 'recompose';

const withAsyncDependencies = input => (BaseComponent) => {
  const factory = createEagerFactory(BaseComponent);

  function WithAsyncDependencies(props) {
    if (props.loadingDependencies === false) {
      return factory(props);
    }

    return null;
  }

  return compose(
    withState('loadingDependencies', 'setLoadingDependencies', null),
    lifecycle({
      componentWillMount() {
        input(this.props)
        .then(() => {
          this.props.setLoadingDependencies(false);
        });
        this.props.setLoadingDependencies(true);
      },
    }),
  )(WithAsyncDependencies);
};

export default withAsyncDependencies;
