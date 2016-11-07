import PassCrypt from '../passcrypt'
import User from '../user'

export default {
  newlogin (req, res, next) {
    res.render('auth/login', { session: req.session })
  },
  async login (req, res, next) {
    const username = req.body.username || ''
    const password = req.body.password || ''

    try {
      const user = await User.get(username)
      if (await PassCrypt.compare(password, user.password)) {
        req.session.currentUser = user
        console.log(`User ${user.id} Logged with success`)
        res.redirect('/')
      } else {
        res.redirect('/auth/login')
      }
    } catch (error) {
      console.error(error)
      res.redirect('/auth/login')
    }
  },
  logout (req, res, next) {
    if (req.session.currentUser) {
      const id = req.session.currentUser.id
      req.session.destroy((err) => {
        if (err) {
          console.error(err)
        }
      })
      console.log(`User ${id} Loggout`)
    } else {
      console.warn(`User Anonymous Try Loggout!`)
    }
    res.redirect('/')
  }
}
