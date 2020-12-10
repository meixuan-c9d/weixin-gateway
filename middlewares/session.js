const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const redisClient = require('../configs/redis')

module.exports = session({
  store: new RedisStore({
    client: redisClient
  }),
  secret: 'liquidsnake',
  resave: false,
  saveUninitialized: true,
  cookie: {
    sameSite: 'none'
  }
})