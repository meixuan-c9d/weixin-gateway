const debug = require('../configs/debug')
const fetch = require('node-fetch')
const wrap = require('../utils/wrap')

module.exports = wrap(async (request, response, next) => {
  const sessionId = request.session.id
  const responseFetch = await fetch(
    `${process.env.SERVICE_ADDRESS_BASE_ACCESS_TOKEN}:` + 
    `${process.env.SERVICE_PORT_BASE_ACCESS_TOKEN}/` +
    `${sessionId}`
  )
  const responseConcat = await responseFetch.json()
  debug.log(`
    service response of base access token %O
  `, responseConcat)
  response.json(responseConcat)
})