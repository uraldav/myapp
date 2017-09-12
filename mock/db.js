module.exports = () => {
  return {
    mentions: require('./mentions')(),
    auth: require('./auth')(),
    userdata: require('./auth')().userdata,
    users: require('./users')(),
    input_thematics: require('./input_thematics')(),
    model_thematics: require('./model_thematics')(),
    user_roles: require('./user_roles')(),
    permissions: require('./permissions')(),
  };
};
