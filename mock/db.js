module.exports = () => {
  return {
    mentions: require('./mentions')(),
    users: require('./users')(),
    input_thematics: require('./input_thematics')(),
    model_thematics: require('./model_thematics')(),
  };
};
