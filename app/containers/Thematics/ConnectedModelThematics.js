import { compose, pure } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import ModelThematics from '../../components/Thematics/ModelThematics';
import { modelThematicsSelector } from './selectors';

const mapStateToProps = createStructuredSelector({
  data: modelThematicsSelector,
});

export default compose(connect(mapStateToProps), pure)(ModelThematics);
