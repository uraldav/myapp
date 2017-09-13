const fetchInputThematics = axios => () =>
  axios.get('/api/input_thematics').then(({ data }) => ({ response: data }));

const fetchModelThematics = axios => () =>
  axios.get('/api/model_thematics').then(({ data }) => ({ response: data }));

const saveInputThematic = axios => inputThematic =>
  axios[inputThematic.id === 0 ? 'post' : 'patch'](
    '/api/input_thematics',
    inputThematic,
  )
    .then(({ data }) => ({ response: data }))
    .catch(error => ({ error }));

const saveModelThematic = axios => inputThematic =>
  axios[inputThematic.id === 0 ? 'post' : 'patch'](
    '/api/input_thematics',
    inputThematic,
  )
    .then(({ data }) => ({ response: data }))
    .catch(error => ({ error }));

const deleteInputThematic = axios => inputThematic =>
  axios
    .delete('/api/input_thematics', { params: { id: inputThematic.id } })
    .then(({ data }) => ({ response: data }))
    .catch(error => ({ error }));

const deleteModelThematic = axios => modelThematic =>
  axios
    .delete('/api/model_thematics', { params: { id: modelThematic.id } })
    .then(({ data }) => ({ response: data }))
    .catch(error => ({ error }));

export default axios => ({
  fetchInputThematics: fetchInputThematics(axios),
  fetchModelThematics: fetchModelThematics(axios),
  saveInputThematic: saveInputThematic(axios),
  saveModelThematic: saveModelThematic(axios),
  deleteInputThematic: deleteInputThematic(axios),
  deleteModelThematic: deleteModelThematic(axios),
});
