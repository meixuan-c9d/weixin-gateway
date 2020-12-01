const fetch = require('node-fetch')
module.exports = async (jsapiTicket, url) => {
  const responseFetch = await fetch(
    `${process.env.SERVICE_ADDRESS_JSSDK_CONFIG}:` + 
    `${process.env.SERVICE_PORT_JSSDK_CONFIG}/` +
    `${jsapiTicket}?url=${url}`
  )
  return await responseFetch.json()
}