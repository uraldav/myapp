module.exports = () => {
  return {
    auth: require('./auth')(),
    user_data: require('./auth')().user_data,
    users: require('./investigation-mock/users')(),
    user_roles: require('./investigation-mock/user_roles')(),
    permissions: require('./investigation-mock/permissions')(),
    reasons: require('./investigation-mock/reasons')(),
  };
};
