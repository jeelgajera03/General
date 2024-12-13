module.exports = function makeAddProductAction({ addProduct, formatResponse, formatError }) {
  return async function addProductAction(httpRequest) {
    const { name, description, price, stock } = httpRequest.body;
    try {
      const result = await addProduct({ name, description, price, stock });
      return formatResponse({ statusCode: 201, body: result });
    } catch (error) {
      // httpRequest.logger.error(`Got error while adding a product`, error);
      return formatError({ error });
    }
  };
};
