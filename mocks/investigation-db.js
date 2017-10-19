module.exports = () => {
  return {
    auth: require('./auth')(),
    user_data: require('./auth')().user_data,
    users: require('./investigation-mock/users')(),
    user_roles: require('./user_roles')(),
    investigations: require('./investigation-mock/investigations')(),
  };
};
