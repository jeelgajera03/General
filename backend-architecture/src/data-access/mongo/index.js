const {
  getUserModel,
  getProductModel,
} = require('../models');

const makeUserDb = require('./user-db');
const userDb = makeUserDb({getUserModel});

const makeProductDb = require('./product-db');
const productDb = makeProductDb({getProductModel});

module.exports = {
  userDb, 
  productDb,
}