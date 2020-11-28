const debug = require('../configs/debug')
const fetch = require('node-fetch')
const wrap = require('../utils/wrap')

module.exports = wrap(async (request, response, next) => {
  const sessionId = request.session.id

  const responseFetchBaseAccessToken = await fetch(
    `${process.env.LISTEN_ADDRESS}:${process.env.LISTEN_PORT}` +
    `/base-access-token`
  )
  const { baseAccessToken } = await responseFetchBaseAccessToken.json()

  const responseFetchJSAPITicket = await fetch(
    `${process.env.SERVICE_ADDRESS_JSAPI_TICKET}:` + 
    `${process.env.SERVICE_PORT_JSAPI_TICKET}/` +
    `${sessionId}/${baseAccessToken}`
  )
  const responseConcatJSAPITicket = await responseFetchJSAPITicket.json()
  debug.log(`
    service response of jsapi ticket %O
  `, responseConcatJSAPITicket)
  response.json(responseConcatJSAPITicket)
})