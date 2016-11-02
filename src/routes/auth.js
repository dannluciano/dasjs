'use strict'

const express = require('express')
const router = express.Router()

const db = require('../database')

const bcrypt = require('bcrypt')
const crypto = require('crypto')
const configs = require('../configs')

router.get('/login', (req, res) => {
  res.render('auth/login', {session: req.session})
})

router.post('/login', (req, res) => {
  const username = req.body.username
  let password = crypto.createHash('sha512').update(req.body.password).digest('hex')

  db.one('select * from users where username=$1 limit 1', [username])
    .then((data) => {
      let hash = data.password
      const aes = crypto.createDecipher('aes-256-cbc', configs.ENCRYPT_KEY)
      hash = aes.update(hash, 'hex', 'utf8')
      hash += aes.final('utf8')

      if (bcrypt.compareSync(password, hash)) {
        const user = {
          'id': data.id,
          'username': data.username,
          'admin': data.admin
        }
        req.session.currentUser = user
        console.log(`User ${user.id} Logged with success`)
        res.redirect('/')
      } else {
        console.warn(`User ${username} tryed to Login but Password is Wrong!`)
        res.redirect('/auth/login')
      }
    })
    .catch((error) => {
      if (error.message.match(/No data returned/)) {
        console.warn(`The User ${username} not Exists in Database!`)
      } else {
        console.error(error)
      }
      res.redirect('/auth/login')
    })
})

router.post('/logout', (req, res) => {
  const id = req.session.currentUser.id
  req.session.destroy((err) => {
    if (err) {
      console.error(err)
    }
  })
  console.log(`User ${id} Loggout with success!`)
  res.redirect('/')
})

module.exports = router
