const express = require('express');
const router = express.Router();

const makeHttpCallback = require('./http-server-callback/http-callback');
const { userController  } = require('./controllers');

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

module.exports = router;
