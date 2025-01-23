const {
  getUserModel,
  getProductModel,
} = require('../models');

const makeUserDb = require('./user-db');
const userDb = makeUserDb({getUserModel});

module.exports = {
  userDb, 
}