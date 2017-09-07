module.exports = () => {
  return {
    mentions: require('./mentions')(),
    users: require('./users')(),
  };
};
