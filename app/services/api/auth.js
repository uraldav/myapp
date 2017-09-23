const authorize = axios => (userName, password) =>
  axios
    .post('/api/auth', {
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
    .catch(error => ({ error }));

const fetchUserData = axios => token =>
  axios
    .get('/api/userdata', {
      data: {
        token,
      },
    })
    .then(({ data }) => {
      return {
        response: { userData: data.userdata, token: data.token },
      };
    })
    .catch(error => ({ error }));

export default axios => ({
  authorize: authorize(axios),
  fetchUserData: fetchUserData(axios),
});
