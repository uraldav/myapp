module.exports = () => {
  return {
    mentions: require('./mentions')(),
    mentions_words: require('./mentions_words')(),
    auth: require('./auth')(),
    user_data: require('./auth')().user_data,
    users: require('./users')(),
    input_thematics: require('./input_thematics')(),
    model_thematics: require('./model_thematics')(),
    user_roles: require('./user_roles')(),
    permissions: require('./permissions')(),
    priority_coefficients: require('./priority_coefficients')(),
    important_authors: require('./important_authors')(),
  };
};
