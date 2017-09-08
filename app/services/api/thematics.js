export const fetchInputThematics = () =>
  fetch('/api/input_thematics',
    { method: 'GET' })
    .then(response => response.json());

export const fetchModelThematics = () =>
  fetch('/api/model_thematics',
    { method: 'GET' })
    .then(response => response.json());
