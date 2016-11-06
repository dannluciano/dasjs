import db from './database'

export default {
    get: (username) => {
        return db.one('SELECT id, username, email, admin FROM users WHERE username = $1 LIMIT 1', [username])
    },
    getAll: () => {
        return db.any('SELECT id, username, email, admin FROM users ORDER BY admin DESC, username ASC')
    },
    update: (username, isAdmin = false) => {
        return db.none('UPDATE users SET admin=$1 WHERE username = $2', [isAdmin, username])
    },
    insert: async (user) => {
        return db.one('INSERT INTO users (username, email, password) VALUES($[username], $[email], $[password]) returning id', user)
    },
    destroy: (user) => {
        db.none('DELETE FROM users WHERE id=$1', user.id)
    }



}
