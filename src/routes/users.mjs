import User from '../user'
import PassCrypt from '../passcrypt'

export default {
  async getAll (req, res, next) {
    const userId = req.session.currentUser.id || 'Anonymous'
    const isAdmin = req.session.currentUser.admin || false
    if (isAdmin) {
      try {
        const users = await User.getAll()
        console.log(`User ${req.session.currentUser.id} with admin loaded all users`)
        res.render('users/list', { users: users, session: req.session })
      } catch (error) {
        console.error(error)
        res.redirect('/')
      }
    } else {
      console.warn(`User ${userId} without admin try load all users`)
      res.redirect('/auth/login')
    }
  },
  newUser (req, res, next) {
    res.render('users/new', { session: req.session })
  },
  async createUser (req, res, next) {
    let user = req.body.user
    try {
      user.password = await PassCrypt.encrypt(user.password)
      const { id } = await User.insert(user)

      console.log(`User ${id} created with success!`)
      res.redirect('/')
    } catch (error) {
      console.error(error)
      res.redirect('/users/new')
    }
  },
  async getUser (req, res, next) {
    const username = req.params.username
    const currentUser = req.session.currentUser

    if ((currentUser && currentUser.admin) || (currentUser.username === username)) {
      try {
        const user = await User.get(username)
        console.log(`User ${currentUser.id} loaded user ${username}`)
        res.render('users/show', { user: user, session: req.session })
      } catch (error) {
        console.error(error)
        console.warn(`User ${currentUser.id} try load user ${username}, but it not exists!`)
        res.redirect('/')
      }
    } else {
      console.warn(`User ${currentUser.id} try to load user ${username} info`)
      res.redirect('/')
    }
  },
  async editUser (req, res, next) {
    const username = req.params.username
    const currentUser = req.session.currentUser

    if ((currentUser && currentUser.admin) || (currentUser.username === username)) {
      try {
        const user = await User.get(username)
        res.render('users/edit', { user: user, session: req.session })
      } catch (error) {
        console.warn(`The User ${username} Not Exists!`)
        res.redirect('/users')
      }
    } else {
      console.warn(`User ${currentUser.id} try to edit user ${username} info`)
      res.redirect('/')
    }
  },
  async updateUser (req, res, next) {
    const username = req.params.username
    const currentUser = req.session.currentUser

    if ((currentUser && currentUser.admin) || (currentUser.username === username)) {
      try {
        const user = await User.get(username)
        const isAdmin = req.body.user.admin || false
        await User.update(username, isAdmin)
        console.log(`User ${user.id} Updated per User ${currentUser.id}`)
        res.redirect(`/users/${username}`)
      } catch (error) {
        console.error(error)
        res.redirect(`/users`)
      }
    } else {
      console.warn(`User ${currentUser.id} try to update user ${username} info`)
      res.redirect('/')
    }
  },
  async destroyUser (req, res, next) {
    const username = req.params.username
    const currentUser = req.session.currentUser

    if ((currentUser && currentUser.admin) && (currentUser.username !== username)) {
      try {
        const user = await User.get(username)
        await User.destroy(user)
        console.log(`User ${user.id} Deleted per User ${currentUser.id} with Success`)
        res.redirect('/users/')
      } catch (error) {
        console.error(error)
        res.redirect('/')
      }
    } else {
      console.warn(`User ${currentUser.id} try to Deleted to self or User ${username}`)
      res.redirect('/')
    }
  }
}
