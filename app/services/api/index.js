import mentions from './mentions';
import auth from './auth';
import users from './users';
import thematics from './thematics';
import importantAuthors from './importantAuthors';

export default axios => ({
  mentions: mentions(axios),
  auth: auth(axios),
  users: users(axios),
  thematics: thematics(axios),
  importantAuthors: importantAuthors(axios),
});
