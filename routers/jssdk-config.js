const express = require('express')
const router = express.Router()
const serveJSSDKConfig = require('../services/jssdk-config')
router
  .route('/')
  .get(serveJSSDKConfig)
module.exports = router