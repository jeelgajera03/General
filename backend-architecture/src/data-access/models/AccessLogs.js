module.exports = function makeAccessLogModel({Mongoose, mainDBConnection}) {
  return async function getAccessLogModel() {
    const dbConnection = await mainDBConnection;
    try {
      return dbConnection.model('AccessLog');
    } catch (e) {
      const accessLogSchema = new Mongoose.Schema({
        uuid: {type: String, required: true},
        client: {type: String, trim: true},
        api: {type: String, trim: true},
        apiMethod: {type: String, trim: true, lowercase: true},
        apiId: {type: Number, required: true},
        origin: {type: String, default: ''},
        email: {type: String, trim: true},
        startTime: {type: Number},
        type: {type: String},
        responseTime: {type: Number},
        isTimedOut: {type: Boolean, default: false},
        responseSize: {type: Number},
      }, {collection: 'logs', versionKey: false, timestamps: {createdAt: 'createdAt', updatedAt: 'updatedAt'}});
      return dbConnection.model('AccessLog', accessLogSchema);
    }
  };
};
