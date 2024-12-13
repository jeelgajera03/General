const {
  AlreadyExistsError,
  AuthenticationFailedError,
  AuthorizationFailedError,
  DataNotFoundError,
  ForbiddenError,
  GeneralError,
  ObjectNotFoundError,
  PDIFailedError,
  RouteNotFoundError,
  TimeoutError,
  ValidationError,
} = require('../../exceptions');

const { productDb } = require('../../data-access/mongo');

const makeAddProduct = require('./addProduct');
const addProduct = makeAddProduct({productDb, ValidationError});

const makeGetProductList = require('./getProductList');
const getProductList = makeGetProductList({ productDb });

module.exports = {
  addProduct, 
  getProductList,
}