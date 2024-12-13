const formatResponse = require('../format-response').formatResponse;
const formatError = require('../format-response').formatError;

const { registerUser, loggedInUser } = require('../../use-cases/User');

const makeRegisterUserAction = require('./registerUser');
const registerUserAction = makeRegisterUserAction({ registerUser, formatResponse, formatError }); 

const makeLoggedInUserAction = require('./loggedInUser');
const loggedInUserAction = makeLoggedInUserAction({loggedInUser, formatResponse, formatError})
module.exports = {
  registerUserAction,
  loggedInUserAction,
};
