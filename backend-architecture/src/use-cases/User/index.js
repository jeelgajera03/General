const bcrypt = require('bcrypt');
const { userDb } = require('../../data-access/mongo');
const jwt = require('jsonwebtoken');
const config = require('../../config')
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
const registerUser = makeRegisterUser({bcrypt, userDb, AlreadyExistsError, ValidationError});

const makeLoggedInUser = require('./loggedInUser');
const loggedInUser = makeLoggedInUser({bcrypt, userDb, AuthenticationFailedError, jwt, config});

module.exports = {
  registerUser,
  loggedInUser,
}