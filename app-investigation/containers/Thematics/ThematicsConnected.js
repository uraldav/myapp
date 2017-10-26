import { compose, pure } from 'recompose';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Thematics from '../../components/Thematics/Thematics';
import { dataSelector } from './selectors';

const mapStateToProps = createStructuredSelector({
  data: dataSelector,
});

const mapDispatchToProps = {};

export default compose(connect(mapStateToProps, mapDispatchToProps), pure)(
  Thematics,
);
