import express from 'express'
import path from 'path'
import logger from 'morgan'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import helmet from 'helmet'

import configs from './configs'
import routes from './routes'

import sdb from 'connect-pg-simple'

const app = express()

app.set('views', path.join(process.cwd(), '/views'))
app.set('view engine', 'ejs')

app.use(helmet())
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(cookieParser(configs.COOKIE_KEY))
app.use(express.static(path.join(process.cwd(), '/public')))
app.use(session({
  store: new(sdb(session))({
    conString: configs.DATABASE_URL
  }),
  secret: configs.SESSION_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }
}))

app.use(routes.homeRoute)
app.use(routes.authRoutes)
app.use(routes.usersRoutes)

app.use((req, res, next) => {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err,
      session: req.session
    })
  })
}

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: {},
    session: req.session
  })
})

export default app
