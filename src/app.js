'use strict'

import 'babel-polyfill'

const express = require('express')
const path = require('path')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('express-session')
const helmet = require('helmet')
const configs = require('./configs')
const routes = require('./routes/index')
const users = require('./routes/users')
const auth = require('./routes/auth')
const app = express()

app.set('views', path.join(__dirname, '../views'))
app.set('view engine', 'ejs')

app.use(helmet())
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '../public')))
app.use(session({
  secret: configs.SESSION_KEY,
  resave: false,
  saveUninitialized: false
}))

app.use('/', routes)
app.use('/users', users)
app.use('/auth', auth)

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

module.exports = app
