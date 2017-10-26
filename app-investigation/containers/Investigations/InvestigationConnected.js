import { compose, pure } from 'recompose';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Investigations from '../../components/Investigations/Investigations';
import { dataSelector, selectedInvestigationSelector } from './selectors';
import { selectInvestigation } from './ducks';

const mapStateToProps = createStructuredSelector({
  data: dataSelector,
  selectedInvestigation: selectedInvestigationSelector,
});

const mapDispatchToProps = {
  onSelectInvestigation: selectInvestigation,
};

export default compose(connect(mapStateToProps, mapDispatchToProps), pure)(
  Investigations,
);
