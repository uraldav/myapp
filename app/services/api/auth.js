const authorize = axios => (userName, password) =>
  axios
    .post('/api/auth', {
      user_name: userName,
      password,
    })
    .then(({ data }) => {
      debugger;
      return {
        token: data.token,
        userData: data.user_data,
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
        response: { userData: data.user_data, token: data.token },
      };
    })
    .catch(error => ({ error }));

export default axios => ({
  authorize: authorize(axios),
  fetchUserData: fetchUserData(axios),
});
