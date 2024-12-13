const express = require('express');
const router = express.Router();

const makeHttpCallback = require('./http-server-callback/http-callback');
const { userController, productController  } = require('./controllers');

router.post(
  '/register',
  makeHttpCallback({
    controller: userController.registerUserAction,
    byPassAuthCheck: true,
  })
);

router.post(
  '/login',
  makeHttpCallback({
    controller: userController.loggedInUserAction,
    byPassAuthCheck: true,
  })
);

router.post(
  '/products',
  makeHttpCallback({
    controller: productController.addProductAction,
    byPassAuthCheck: false,
    isAdmin: true,
  })
);

router.get(
  '/products',
  makeHttpCallback({
    controller: productController.getProductListAction,
    byPassAuthCheck: false,
  })
);

module.exports = router;
