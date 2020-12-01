const debug = require('../configs/debug')
const wrap = require('../utils/wrap')
const getBaseAccessToken = require('../libs/get-base-access-token')
const getJSAPITicket = require('../libs/get-jsapi-ticket')

module.exports = wrap(async (request, response, next) => {
  const sessionId = request.session.id
  const { baseAccessToken } = await getBaseAccessToken(sessionId)
  const responseGetJSAPITicket = await getJSAPITicket(sessionId, baseAccessToken)
  debug.log(`
service response of jsapi ticket %O
  `, responseGetJSAPITicket)
  response.json(responseGetJSAPITicket)
})