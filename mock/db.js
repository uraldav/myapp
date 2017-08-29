module.exports = () => {
  return {
    mentions: require('./mentions')(),
    auth: require('./auth')(),
    userdata: require('./auth')().userdata,
  };
};
