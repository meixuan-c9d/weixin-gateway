const debug = require('../configs/debug')
const wrap = require('../utils/wrap')
const getBaseAccessToken = require('../libs/get-base-access-token')
const getJSAPITicket = require('../libs/get-jsapi-ticket')
const getJSSDKConfig = require('../libs/get-jssdk-config')

module.exports = wrap(async (request, response, next) => {
  const sessionId = request.session.id
  debug.log(`
sessionId used by gateway ${sessionId}
  `)
  const { baseAccessToken } = await getBaseAccessToken(sessionId)
  const { jsapiTicket } = await getJSAPITicket(sessionId, baseAccessToken)

  // get jssdk config with jsapi ticket
  const responseGetJSSDKConfig = await getJSSDKConfig(jsapiTicket, request.query.url)
  debug.log(`
service response of jssdk config %O
  `, responseGetJSSDKConfig)
  response.json(responseGetJSSDKConfig)
})