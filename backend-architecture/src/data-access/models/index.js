const makeUserModel = require('./User');
const makeAccessLogModel = require('./AccessLogs');
const makeThirdPartyLogsModel = require('./ThirdPartyLogs');
const makeReqResLogsModel = require('./ReqResLogs');

const Mongoose = require('mongoose');
const {mainDBConnection} = require('../../config/db')

const getUserModel = makeUserModel({Mongoose, mainDBConnection});
const getAccessLogModel = makeAccessLogModel({Mongoose, mainDBConnection});
const getReqResModel = makeReqResLogsModel({mainDBConnection, Mongoose});
const getThirdPartyLogsModel = makeThirdPartyLogsModel({Mongoose, mainDBConnection});

module.exports = {
  getUserModel,
  getAccessLogModel,
  getReqResModel,
  getThirdPartyLogsModel
}