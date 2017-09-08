import axios from 'axios';

export const authorize = (userName, password) =>
  axios.get('/api/auth',
    {
      params: {
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

export const fetchUserData = token =>
axios.get('/api/userdata',
  {
    params: {
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
