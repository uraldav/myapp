const authorize = axios => (userName, password) =>
  axios
    .post('/api/auth', {
      user_name: userName,
      password,
    })
    .then(({ data }) => {
      return {
        response: { userData: data.user_data, token: data.token },
      };
    })
    .catch(error => ({ error }));

const fetchUserData = axios => token =>
  axios
    .get('/api/user_data', {
      data: {
        token,
      },
    })
    .then(({ data }) => {
      return {
        response: { userData: data },
      };
    })
    .catch(error => ({ error }));

export default axios => ({
  authorize: authorize(axios),
  fetchUserData: fetchUserData(axios),
});
