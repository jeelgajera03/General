class GeneralError extends Error {
  constructor(...params) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(errorCode, ...params);
    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, GeneralError);
    }
    this.name = 'GeneralError';
    // Custom debugging information
    this.errorCode = errorCode;
    this.httpStatusCode = 400;
    this.date = new Date();
  }
}
module.exports = GeneralError;