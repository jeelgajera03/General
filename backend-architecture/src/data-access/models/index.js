const makeUserModel = require('./User');
const makeProductModel = require('./Product');

const Mongoose = require('mongoose');
const {mainDBConnection} = require('../../config/db')

const getUserModel = makeUserModel({Mongoose, mainDBConnection});

module.exports = {
  getUserModel,
}