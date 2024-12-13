module.exports = function makeRegisterUserAction({ registerUser, formatResponse, formatError }) {
  return async function registerUserAction(httpRequest) {
    const { name, email, password } = httpRequest.body;
    try {
      const result = await registerUser({ name, email, password });
      return formatResponse({ statusCode: 201, body: result });
    } catch (error) {
      // httpRequest.logger.error(`Got error while registering a user`, error);
      return formatError({ error });
    }
  };
};
