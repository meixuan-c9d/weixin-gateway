const debug = require('../configs/debug')
const fetch = require('node-fetch')
const wrap = require('../utils/wrap')

module.exports = wrap(async (request, response, next) => {
  const sessionId = request.session.id

  debug.log(`
  sessionId used by gateway ${sessionId}
  `)

  // get jsapi ticket
  const responseFetchBaseAccessToken = await fetch(
    `${process.env.SERVICE_ADDRESS_BASE_ACCESS_TOKEN}:` + 
    `${process.env.SERVICE_PORT_BASE_ACCESS_TOKEN}/` +
    `${sessionId}`
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

  const jsapiTicket = responseConcatJSAPITicket.jsapiTicket

  // get jssdk config with jsapi ticket

  const responseFetchJSSDKConfig = await fetch(
    `${process.env.SERVICE_ADDRESS_JSSDK_CONFIG}:` + 
    `${process.env.SERVICE_PORT_JSSDK_CONFIG}/` +
    `${jsapiTicket}?url=${request.query.url}`
  )
  const responseConcatJSSDKConfig = await responseFetchJSSDKConfig.json()
  debug.log(`
    service response of jssdk config %O
  `, responseConcatJSSDKConfig)

  response.json(responseConcatJSSDKConfig)

})