module.exports = function makeGetProductListAction({ getProductList, formatResponse, formatError }) {
  return async function getProductListAction(httpRequest) {
    const { query } = httpRequest;
    try {
      const result = await getProductList({ query });
      return formatResponse({ statusCode: 200, body: result });
    } catch (error) {
      // httpRequest.logger.error(`Got error while fetching product list`, error);
      return formatError({ error });
    }
  };
};
