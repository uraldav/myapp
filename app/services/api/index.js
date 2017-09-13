import mentions from './mentions';
import auth from './auth';
import users from './users';
import thematics from './thematics';
import priorityCoefficients from './priorityCoefficients';

export default axios => ({
  mentions: mentions(axios),
  auth: auth(axios),
  users: users(axios),
  thematics: thematics(axios),
  priorityCoefficients: priorityCoefficients(axios),
});
