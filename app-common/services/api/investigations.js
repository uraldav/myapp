const fetchInvestigations = axios => () =>
  axios
    .get('/api/investigations')
    .then(({ data }) => ({ response: mapInvestigationsFromResponse(data) }))
    .catch(error => ({ error }));

export default axios => ({
  fetchInvestigations: fetchInvestigations(axios),
});

function mapInvestigationsFromResponse(response) {
  return response.map(item => ({
    id: item.id,
    srId: item.sr_id,
    depName: item.dep_name,
    status: item.status,
    openDate: item.open_date,
    plannedCompletionDate: item.planned_completion_date,
    critical: item.critical,
    userLogin: item.user_login,
    completedDate: item.completed_date,
    closeDate: item.close_date,
  }));
}
