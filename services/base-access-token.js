const debug = require('../configs/debug')
const wrap = require('../utils/wrap')
const getBaseAccessToken = require('../libs/get-base-access-token')

module.exports = wrap(async (request, response, next) => {
  const sessionId = request.session.id
  const responseGetBaseAccessToken = await getBaseAccessToken(sessionId)
  debug.log(`
service response of base access token %O
  `, responseGetBaseAccessToken)
  response.json(responseGetBaseAccessToken)
})