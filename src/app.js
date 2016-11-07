import 'babel-polyfill'
import express from 'express'
import path from 'path'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import session from 'express-session'
import helmet from 'helmet'

import configs from './configs'
import index from './routes/index'
import auth from './routes/auth'
import users from './routes/users'

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

function isLogged (req, res, next) {
  if (req.session.currentUser) {
    next()
  } else {
    res.redirect('/auth/login')
  }
}

const routes = express.Router()

routes.route('/')
  .get(index)

routes.route('/auth/login/')
  .get(auth.newlogin)
  .post(auth.login)
routes.route('/auth/logout/')
  .post(auth.logout)

app.use(routes)

const usersRoutes = express.Router()

usersRoutes.route('/users/new').get(users.newUser)
usersRoutes.route('/users/:username/edit')
  .all(isLogged)
  .get(users.editUser)
usersRoutes.route('/users/:username')
  .all(isLogged)
  .get(users.getUser)
  .post(users.updateUser)
usersRoutes.route('/users')
  .get(isLogged, users.getAll)
  .post(users.createUser)
usersRoutes.route('/users/:username/destroy')
  .all(isLogged)
  .post(users.destroyUser)

app.use(usersRoutes)

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
