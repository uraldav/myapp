import mentions from './mentions';
import auth from './auth';
import users from './users';
import thematics from './thematics';
import priorityCoefficients from './priorityCoefficients';
import importantAuthors from './importantAuthors';
import userRoles from './userRoles';
import mentionsWords from './mentions_words';

export default axios => ({
  mentions: mentions(axios),
  mentionsWords: mentionsWords(axios),
  auth: auth(axios),
  users: users(axios),
  thematics: thematics(axios),
  importantAuthors: importantAuthors(axios),
  priorityCoefficients: priorityCoefficients(axios),
  userRoles: userRoles(axios),
});
