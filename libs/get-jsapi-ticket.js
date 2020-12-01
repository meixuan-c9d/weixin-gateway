const fetch = require('node-fetch')
module.exports = async (sessionId, baseAccessToken) => {
  const responseFetch = await fetch(
    `${process.env.SERVICE_ADDRESS_JSAPI_TICKET}:` + 
    `${process.env.SERVICE_PORT_JSAPI_TICKET}/` +
    `${sessionId}/${baseAccessToken}`
  )
  return await responseFetch.json()
}