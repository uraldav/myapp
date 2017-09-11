export const fetchPriorityCoefficients = () =>
fetch('/api/priority_coefficients',
  { method: 'GET' })
  .then(response => response.json());
