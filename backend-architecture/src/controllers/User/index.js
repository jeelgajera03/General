const formatResponse = require('../format-response').formatResponse;
const formatError = require('../format-response').formatError;

const { registerUser } = require('../../use-cases/User');

const makeRegisterUserAction = require('./registerUser');
const registerUserAction = makeRegisterUserAction({ registerUser, formatResponse, formatError }); 

module.exports = {
  registerUserAction,
};
