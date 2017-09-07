import { compose } from 'recompose';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Filter from '../../components/Mention/Filter';
import { request } from './ducks';

const mapStateToProps = createStructuredSelector({

});

const mapDispatchToProps = ({
  onApplyFilter: request,
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(Filter);
