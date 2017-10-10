import { createSelector } from 'reselect';

export const appSelector = state => state.get('app');

export const menuItemsSelector = createSelector(appSelector, app =>
  app.get('menuItems').toJS(),
);

export const loadingMenuItems = createSelector(appSelector, app =>
  app.get('loadingMenuItems'),
);

export const expandedMenuItemsSelector = createSelector(appSelector, app =>
  app.get('expandedMenuItems').toJS(),
);

export const selectedMenuItemSelector = createSelector(appSelector, app =>
  app.get('selectedMenuItem'),
);

export const isMenuCollapsedSelector = createSelector(appSelector, app =>
  app.get('isMenuCollapsed'),
);
