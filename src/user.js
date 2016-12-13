import db from './database'

export default {
  get: (username) => {
    return db.one('SELECT * FROM users WHERE username = $1 LIMIT 1 -- User.get in users.js', [username])
  },
  getAll: () => {
    return db.any('SELECT id, username, email, admin FROM users ORDER BY admin DESC, username ASC -- User.getAll in users.js')
  },
  update: (username, isAdmin = false) => {
    return db.none('UPDATE users SET admin=$1 WHERE username = $2 -- User.update in users.js', [isAdmin, username])
  },
  insert: (user) => {
    return db.one('INSERT INTO users (username, email, password) VALUES($[username], $[email], $[password]) returning id -- User.insert in users.js', user)
  },
  destroy: (user) => {
    return db.none('DELETE FROM users WHERE id=$1 -- User.destroy in users.js', user.id)
  }
}
