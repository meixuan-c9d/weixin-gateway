const express = require('express')
const router = express.Router()
const serveBaseAccessToken = require('../services/base-access-token')
router
  .route('/')
  .get(serveBaseAccessToken)
module.exports = router