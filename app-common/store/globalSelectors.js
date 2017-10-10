export const locationSelector = state => state.get('router').location;

export const permissionsSelector = state => state.get('app').get('permissions').toJS();
