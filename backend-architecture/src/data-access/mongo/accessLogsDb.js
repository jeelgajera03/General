function makeAccessLogsDb({getAccessLogModel, getReqResModel, getThirdPartyLogsModel}) {
  return Object.freeze({
    addAccessLog,
    searchAccessLogs,
    addThirdPartyLogs,
    getReqResData,
    getThirdPartyData,
  });

  async function addAccessLog({payload, reqResPayload}) {
    const accessLogDataModel = await getAccessLogModel();
    await accessLogDataModel(payload).save();

    const reqResDataModel = await getReqResModel();
    await reqResDataModel(reqResPayload).save();
  }

  async function searchAccessLogs({condition, skip, limit}) {
    const accessLogDataModel = await getAccessLogModel();
    return await accessLogDataModel.aggregate([
      {$match: condition},
      {$project: {isTimedOut: 1, uuid: 1, client: 1, api: 1, email: 1, apiId: 1, apiMethod: 1,
        applicationUser: 1, startTime: 1, responseTime: 1, type: 1, responseSize: 1, createdAt: 1,
        updatedAt: 1}},
      {$sort: {startTime: -1}},
      {$group: {_id: null, TotalRow: {$sum: 1}, items: {$push: '$$ROOT'}}},
      {$project: {_id: 0, data: {$slice: ['$items', skip, limit]}, totalRows: '$TotalRow'}},
    ]);
  }

  async function addThirdPartyLogs({payload}) {
    const thirdPartyLogDataModel = await getThirdPartyLogsModel();
    return await thirdPartyLogDataModel(payload).save();
  }

  async function getReqResData({uuid}) {
    const reqResDataModel = await getReqResModel();
    return await reqResDataModel.findOne({uuid}).lean().exec();
  }

  async function getThirdPartyData({uuid}) {
    const thirdPartyLogDataModel = await getThirdPartyLogsModel();
    return await thirdPartyLogDataModel.find({uuid}).lean().exec();
  }
}

module.exports = makeAccessLogsDb;
