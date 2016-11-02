'use strict'

const express = require('express')
const router = express.Router()

const db = require('../database')

const crypto = require('crypto')
const bcrypt = require('bcrypt')
const config = require('../configs')

function loadUser (username) {
  const promise = new Promise(function (resolve, reject) {
    db.one('SELECT id, username, email, admin FROM users WHERE username = $1 LIMIT 1', [username])
      .then(data => {
        resolve(data)
      })
      .catch(error => {
        reject(error)
      })
  })
  return promise
}

router.get('/new', (req, res) => {
  res.render('users/new', {session: req.session})
})

router.get('/', (req, res) => {
  const userId = req.session.currentUser.id || 'Anonymous'
  const isAdmin = req.session.currentUser.admin || false
  if (isAdmin) {
    db.any('SELECT id, username, email, admin FROM users ORDER BY admin DESC, username ASC')
      .then(data => {
        console.log(`User ${req.session.currentUser.id} with admin accessed all users`)
        res.render('users/list', {users: data, session: req.session})
      })
      .catch(error => {
        console.error(error)
        res.redirect('/auth/login')
      })
  } else {
    console.warn(`User ${userId} without admin try access all users`)
    res.redirect('/')
  }
})

router.get('/:username', (req, res) => {
  const username = req.params.username
  const currentUser = req.session.currentUser

  if (currentUser && currentUser.admin || currentUser.username === username) {
    loadUser(username)
      .then(user => {
        console.log(`User ${currentUser.id} Loaded with success`)
        res.render('users/show', {user: user, session: req.session})
      })
      .catch(error => {
        console.error(error)
        console.warn(`The User ${username} Not Exists!`)
        res.redirect('/')
      })
  } else {
    console.warn(`User ${currentUser.id} try to load user ${username} info`)
    res.redirect('/')
  }
})

router.get('/:username/edit', (req, res) => {
  const username = req.params.username
  const currentUser = req.session.currentUser

  if (currentUser && currentUser.admin || currentUser.username === username) {
    loadUser(username)
      .then(user => {
        res.render('users/edit', {user: user, session: req.session})
      })
      .catch(error => {
        console.error(error)
        console.warn(`The User ${username} Not Exists!`)
        res.redirect('/users')
      })
  } else {
    console.warn(`User ${currentUser.id} try to edit user ${username} info`)
    res.redirect('/')
  }
})

router.post('/:username', (req, res) => {
  const username = req.params.username
  const currentUser = req.session.currentUser

  if (currentUser && currentUser.admin || currentUser.username === username) {
    loadUser(username)
      .then(user => {
        const isAdmin = req.body.user.admin || false
        db.none('UPDATE users SET admin=$1 WHERE username = $2', [isAdmin, username])
          .then(() => {
            console.log(`User ${user.id} Updated per User ${currentUser.id} with Success`)
            res.redirect(`/users/${username}`)
          })
          .catch(error => {
            console.error(error)
            res.redirect(`/users/${username}/edit`)
          })
      })
      .catch(error => {
        console.error(error)
        console.warn(`The User ${username} Not Exists!`)
        res.redirect('/users')
      })
  } else {
    console.warn(`User ${currentUser.id} try to update user ${username} info`)
    res.redirect('/')
  }
})

router.post('/', (req, res) => {
  const user = req.body.user
  let hash = user.password

  hash = crypto.createHash('sha512').update(hash).digest('hex')
  hash = bcrypt.hashSync(hash, 12)

  const aes = crypto.createCipher('aes-256-cbc', config.ENCRYPT_KEY)
  hash = aes.update(hash, 'utf8', 'hex')
  hash += aes.final('hex')

  user.password = hash

  db.one('INSERT INTO users (username, email, password) VALUES($[username], $[email], $[password]) returning id', user)
    .then((data) => {
      console.log(`User ${data.id} created with success!`)
      res.redirect('/')
    })
    .catch((error) => {
      if (error.detail.match(/already exists/)) {
        console.warn(`User ${user.username} Already Exists in Database`)
      } else {
        console.error(error)
      }

      res.redirect('/users/new')
    })
})

router.post('/:username/destroy', (req, res) => {
  const username = req.params.username
  const currentUser = req.session.currentUser

  if (currentUser && currentUser.admin && currentUser.username !== username) {
    loadUser(username)
      .then(user => {
        db.none('DELETE FROM users WHERE id=$1', user.id)
          .then(() => {
            console.log(`User ${user.id} Deleted per User ${currentUser.id} with Success`)
            res.redirect('/users/')
          })
          .catch(error => {
            console.error(error)
            res.redirect('/')
          })
      })
      .catch(error => {
        console.error(error)
        res.redirect('/')
      })
  } else {
    console.warn(`User ${currentUser.id} try to Deleted to self or User ${username}`)
    res.redirect('/')
  }
})

module.exports = router
