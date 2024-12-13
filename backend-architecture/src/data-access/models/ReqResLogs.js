module.exports = function makeReqResLogsModel({Mongoose, mainDBConnection}) {
  return async function getReqResModel() {
    const dbConnection = await mainDBConnection;
    try {
      return dbConnection.model('RequestResponseLog');
    } catch (e) {
      const accessLogSchema = new Mongoose.Schema({
        uuid: {type: String, required: true},
        inputParameter: {type: Mongoose.Schema.Types.Mixed, default: null},
        output: {type: Mongoose.Schema.Types.Mixed, default: null},
      }, {collection: 'request_response_logs', versionKey: false,
        timestamps: {createdAt: 'createdAt', updatedAt: 'updatedAt'}});
      return dbConnection.model('RequestResponseLog', accessLogSchema);
    }
  };
};
