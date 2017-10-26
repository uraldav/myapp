import { compose, pure } from 'recompose';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import MassMeasuresComponent from '../../components/MassMeasures';
import { dataSelector, editableMeasureSelector } from './selectors';
import { selectEditableMeasure } from './ducks';

const mapStateToProps = createStructuredSelector({
  measures: dataSelector,
  selectedMeasure: editableMeasureSelector,
});

const mapDispatchToProps = {
  onMeasureClick: selectEditableMeasure,
};

export default compose(connect(mapStateToProps, mapDispatchToProps), pure)(
  MassMeasuresComponent,
);
