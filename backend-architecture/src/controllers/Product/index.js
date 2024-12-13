const formatResponse = require('../format-response').formatResponse;
const formatError = require('../format-response').formatError;

const {
  addProduct,
  getProductList,
} = require('../../use-cases/Product');

const makeAddProductAction = require('./addProduct');
const addProductAction = makeAddProductAction({addProduct, formatResponse, formatError})

const makeGetProductListAction = require('./getProductList');
const getProductListAction = makeGetProductListAction({getProductList, formatResponse, formatError})

module.exports = {
  addProductAction,
  getProductListAction,
}