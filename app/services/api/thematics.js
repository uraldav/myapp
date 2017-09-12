const fetchInputThematics = axios => () =>
  axios('/api/input_thematics').then(({ data }) => data);

const fetchModelThematics = axios => () =>
  axios('/api/model_thematics').then(({ data }) => data);

export default axios => ({
  fetchInputThematics: fetchInputThematics(axios),
  fetchModelThematics: fetchModelThematics(axios),
});
