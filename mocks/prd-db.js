module.exports = () => {
  return {
    mentions: require('./prd-mock/mentions')(),
    mentions_words: require('./prd-mock/mentions_words')(),
    auth: require('./auth')(),
    user_data: require('./auth')().user_data,
    users: require('./prd-mock/users')(),
    input_thematics: require('./prd-mock/input_thematics')(),
    model_thematics: require('./prd-mock/model_thematics')(),
    user_roles: require('./prd-mock/user_roles')(),
    permissions: require('./prd-mock/permissions')(),
    priority_coefficients: require('./prd-mock/priority_coefficients')(),
    important_authors: require('./prd-mock/important_authors')(),
  };
};
