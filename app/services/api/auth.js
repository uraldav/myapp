const authorize = axios => (userName, password) =>
  axios
    .get('/api/auth', {
      data: {
        userName,
        password,
      },
    })
    .then(({ data }) => {
      return {
        token: data.token,
        userData: data.userdata,
      };
    })
    .catch((error) => {
      throw Error(error);
    });

const fetchUserData = axios => token =>
  axios
    .get('/api/userdata', {
      data: {
        token,
      },
    })
    .then(({ data }) => {
      return {
        userData: data,
      };
    })
    .catch((error) => {
      throw Error(error);
    });

export default axios => ({
  authorize: authorize(axios),
  fetchUserData: fetchUserData(axios),
});
