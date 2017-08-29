import { compose } from 'recompose';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Filter from '../../components/Mention/Filter';

const mapStateToProps = createStructuredSelector({

});

const mapDispatchToProps = ({

});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(Filter);
