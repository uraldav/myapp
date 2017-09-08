import { compose, pure } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import InputThematics from '../../components/Thematics/InputThematics';

const mapStateToProps = createStructuredSelector({
  
});

export default compose(
  connect(mapStateToProps),
  pure,
)(InputThematics);
