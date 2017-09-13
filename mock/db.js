module.exports = () => {
  return {
    mentions: require('./mentions')(),
    auth: require('./auth')(),
    userdata: require('./auth')().userdata,
    users: require('./users')(),
    input_thematics: require('./input_thematics')(),
    model_thematics: require('./model_thematics')(),
    priority_coefficients: require('./priority_coefficients')(),
  };
};
