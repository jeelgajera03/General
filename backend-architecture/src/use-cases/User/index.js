const bcrypt = require('bcrypt');
const { userDb } = require('../../data-access/mongo')
const {
  AlreadyExistsError,
  AuthenticationFailedError,
  AuthorizationFailedError,
  DataNotFoundError,
  ForbiddenError,
  GeneralError,
  ObjectNotFoundError,
  PDIFailedError,
  RouteNotFoundError,
  TimeoutError,
  ValidationError,
} = require('../../exceptions');

const makeRegisterUser = require('./registerUser');
const registerUser = makeRegisterUser({bcrypt, userDb, AlreadyExistsError, ValidationError})


module.exports = {
  registerUser,
}