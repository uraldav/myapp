import { compose, pure } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import Main from '../../components/Main/Main';

const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = {};

export default compose(pure)(Main);
