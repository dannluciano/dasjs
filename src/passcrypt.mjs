import Config from './configs'
import Bcrypt from 'bcrypt'
import Crypto from 'crypto'

const BcryptP = {
  hash: (password, saltRounds = 12) => new Promise((resolve, reject) => {
    Bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        reject(err)
      } else {
        resolve(hash)
      }
    })
  }),
  compare: (password, passwordHash) => new Promise((resolve, reject) => {
    Bcrypt.compare(password, passwordHash, (err, res) => {
      if (err) {
        reject(err)
      } else {
        resolve(res)
      }
    })
  })
}

export default {
  async encrypt(plaintext) {
    try {
      const hash = Crypto.createHash('sha512')
        .update(plaintext)
        .digest('hex')
      const bhash = await BcryptP.hash(hash, 12)
      const aes = Crypto.createCipher('aes-256-cbc', Config.ENCRYPT_KEY)

      let ciphertext = aes.update(bhash, 'utf8', 'hex')
      ciphertext += aes.final('hex')

      return ciphertext
    } catch (error) {
      console.error(error)
    }
  },
  async compare(password, ciphertext) {
    try {
      const aes = Crypto.createDecipher('aes-256-cbc', Config.ENCRYPT_KEY)

      let bhash = aes.update(ciphertext, 'hex', 'utf8')
      bhash += aes.final('utf8')

      password = Crypto.createHash('sha512')
        .update(password)
        .digest('hex')

      return await BcryptP.compare(password, bhash)
    } catch (error) {
      console.error(error)
    }
  }
}
