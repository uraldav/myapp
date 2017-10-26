import { compose, pure } from 'recompose';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Auth from '../../components/Auth';
import { request } from './ducks';
import { errorSelector, loadingSelector } from './selectors';

const mapStateToProp = createStructuredSelector({
  error: errorSelector,
  loading: loadingSelector,
});

const mapDispatchToProps = {
  onSubmit: request,
};

export default compose(connect(mapStateToProp, mapDispatchToProps), pure)(Auth);
