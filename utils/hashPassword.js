const bcrypt = require('bcryptjs');

/**
 * EncryptPassword
 * @param {*} password 
 * @returns 
 */
const PasswordEncode = (password) => {
    let salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
}


/**
 * Decode password
 * @param {*} password 
 * @param {*} hash 
 * @returns 
 */

const PasswordDecode = (password, hash) => {
    return bcrypt.compareSync(password, hash)
}


module.exports = {
    PasswordEncode,
    PasswordDecode
}


