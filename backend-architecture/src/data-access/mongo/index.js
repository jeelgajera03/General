const {
  getUserModel,
  getAccessLogModel,
  getReqResModel,
  getThirdPartyLogsModel
} = require('../models');

const makeUserDb = require('./user-db');
const userDb = makeUserDb({getUserModel});

const makeAccessLogsDb = require('./accessLogsDb');
const accessLogsDb = makeAccessLogsDb({getAccessLogModel, getReqResModel, getThirdPartyLogsModel});

module.exports = {
  userDb, 
  accessLogsDb,
}