import { compose, pure } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import ModelThematics from '../../components/Thematics/ModelThematics';

const mapStateToProps = createStructuredSelector({});

export default compose(connect(mapStateToProps), pure)(ModelThematics);
