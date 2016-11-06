'use strict'

import Config from './configs.js'
import Bcrypt from 'bcrypt'
import Crypto from 'crypto'

const bcrypt = {
    hash: (password, saltRounds = 12) => new Promise((resolve, reject) => {
        Bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) {
                reject(err);
            } else {
                resolve(hash);
            }
        });
    }),
    compare: (password, passwordHash) => new Promise((resolve, reject) => {
        Bcrypt.compare(password, passwordHash, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    })
}


export default {
    encrypt: async (plaintext) => {
        try {
            let hash = Crypto.createHash('sha512').update(plaintext).digest('hex')
            let bhash = await bcrypt.hash(hash, 12)
            const aes = Crypto.createCipher('aes-256-cbc', Config.ENCRYPT_KEY)

            let ciphertext = aes.update(bhash, 'utf8', 'hex')
            ciphertext += aes.final('hex')

            hash  = 0
            bhash = 0

            return ciphertext
        } catch(error) {
            console.error(error)
        }
    },
    decrypt: (ciphertext) => {

    }

};
