import { createSelector } from 'reselect';

export const massMeasuresSelector = state => state.get('massMeasures');

export const dataSelector = createSelector(massMeasuresSelector, measures =>
  measures.get('data').toJS(),
);

export const editableMeasureSelector = createSelector(
  massMeasuresSelector,
  measure => measure.get('editableMeasure'),
);
