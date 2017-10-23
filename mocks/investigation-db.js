module.exports = () => {
  return {
    auth: require('./auth')(),
    user_data: require('./auth')().user_data,
    users: require('./investigation-mock/users')(),
    user_roles: require('./investigation-mock/user_roles')(),
    permissions: require('./investigation-mock/permissions')(),
    reasons: require('./investigation-mock/reasons')(),
    measures: require('./investigation-mock/measures')(),
    investigations: require('./investigation-mock/investigations')(),
    investigations_thematics: require('./investigation-mock/thematics')(),
  };
};
