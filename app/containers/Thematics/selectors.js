import { createSelector } from 'reselect';

export const thematicsSelector = state => state.getIn(['thematics']);

export const editableCellSelector = createSelector(
  thematicsSelector,
  thematics => thematics.get('editableCell'),
);

export const editableInputThematicSelector = createSelector(
  thematicsSelector,
  thematics => thematics.get('editableInputThematic'),
);

export const inputThematicsSelector = createSelector(
  thematicsSelector,
  thematics => thematics.get('inputThematics').toJS(),
);

export const modelThematicsSelector = createSelector(
  thematicsSelector,
  thematics => thematics.get('modelThematics').toJS(),
);
