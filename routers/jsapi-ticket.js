const express = require('express')
const router = express.Router()
const serveJSAPITicket = require('../services/jsapi-ticket')
router
  .route('/')
  .get(serveJSAPITicket)
module.exports = router