import express from 'express'
import home from './home'
import auth from './auth'
import users from './users'

const Router = express.Router

function isLogged (req, res, next) {
  if (req.session.currentUser) {
    next()
  } else {
    res.redirect('/auth/login')
  }
}

const homeRoute = Router()
homeRoute.route('/')
  .get(home)

const authRoutes = Router()
authRoutes.route('/auth/login/')
  .get(auth.newlogin)
  .post(auth.login)
authRoutes.route('/auth/logout/')
  .post(auth.logout)

const usersRoutes = Router()
usersRoutes.route('/users/new')
  .get(users.newUser)
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

export default { homeRoute, authRoutes, usersRoutes }
