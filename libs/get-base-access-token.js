const fetch = require('node-fetch')
module.exports = async sessionId => {
  const responseFetch = await fetch(
    `${process.env.SERVICE_ADDRESS_BASE_ACCESS_TOKEN}:` + 
    `${process.env.SERVICE_PORT_BASE_ACCESS_TOKEN}/` +
    `${sessionId}`
  )
  return await responseFetch.json()
}