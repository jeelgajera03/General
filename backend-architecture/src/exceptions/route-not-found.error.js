class RouteNotError extends Error {
  constructor(...params) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(errorCode, ...params);
    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, RouteNotError);
    }
    this.name = 'RouteNotError';
    // Custom debugging information
    this.errorCode = errorCode;
    this.httpStatusCode = 404;
    this.date = new Date();
  }
}
module.exports = RouteNotError;
