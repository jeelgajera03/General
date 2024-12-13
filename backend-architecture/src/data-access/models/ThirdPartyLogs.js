module.exports = function makeThirdPartyLogsModel({Mongoose, mainDBConnection}) {
  return async function getThirdPartyLogsModel() {
    const dbConnection = await mainDBConnection;
    try {
      return dbConnection.model('ThirdPartyLog');
    } catch (e) {
      const accessLogSchema = new Mongoose.Schema({
        uuid: {type: String, required: true},
        client: {type: String, trim: true},
        api: {type: String, trim: true},
        apiMethod: {type: String, trim: true, lowercase: true},
        apiId: {type: String, required: true},
        email: {type: String, trim: true},
        startTime: {type: Number},
        endTime: {type: Number},
        type: {type: String},
        responseTime: {type: Number},
        isTimedOut: {type: Boolean, default: false},
        responseSize: {type: Number},
        inputParameter: {type: Mongoose.Schema.Types.Mixed, default: null},
        requestData: {type: Mongoose.Schema.Types.Mixed, default: null},
        output: {type: Mongoose.Schema.Types.Mixed, default: null},
        thirdParty: {type: String},
      }, {collection: 'third_party_Logs', versionKey: false,
        timestamps: {createdAt: 'createdAt', updatedAt: 'updatedAt'}});
      return dbConnection.model('ThirdPartyLog', accessLogSchema);
    }
  };
};
