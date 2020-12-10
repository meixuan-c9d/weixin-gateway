require('./configs/environment')()
const debug = require('./configs/debug')
const express = require('express')
const app = express()

app.disable('x-powered-by')

const middlewareSession = require('./middlewares/session')
app.use(middlewareSession)

const middlewareCors = require('cors')
app.use(middlewareCors({
  credentials: true
}))

const routerBaseAccessToken = require('./routers/base-access-token')
const routerJSAPITicket = require('./routers/jsapi-ticket')
const routerJSSDKConfig = require('./routers/jssdk-config')
app.use('/base-access-token', routerBaseAccessToken)
app.use('/jsapi-ticket', routerJSAPITicket)
app.use('/jssdk-config', routerJSSDKConfig)

app.get('/', (request, response, next) => {
  debug.log(request.session.id)
  response.send('default page')
})

app.listen(process.env.LISTEN_PORT, () => {
  debug.log(`gateway running at ${process.env.LISTEN_PORT}`)
})
