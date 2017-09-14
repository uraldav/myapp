import { createSelector } from 'reselect';

export const thematicsSelector = state => state.getIn(['thematics']);

export const editableInputCellSelector = createSelector(
  thematicsSelector,
  thematics => thematics.get('editableInputCell'),
);

export const editableModelCellSelector = createSelector(
  thematicsSelector,
  thematics => thematics.get('editableModelCell'),
);

export const editableInputThematicSelector = createSelector(
  thematicsSelector,
  thematics => thematics.get('editableInputThematic'),
);

export const editableModelThematicSelector = createSelector(
  thematicsSelector,
  thematics => thematics.get('editableModelThematic'),
);

export const inputThematicsSelector = createSelector(
  thematicsSelector,
  thematics => thematics.get('inputThematics').toJS(),
);

export const inputThematicLoadingSelector = createSelector(
  thematicsSelector,
  thematics => thematics.get('loadingInputThematics'),
);

export const modelThematicsSelector = createSelector(
  thematicsSelector,
  thematics => thematics.get('modelThematics').toJS(),
);

export const modelThematicLoadingSelector = createSelector(
  thematicsSelector,
  thematics => thematics.get('loadingModelThematics'),
);
