const jwt = require('jsonwebtoken');


/**
 * This function will help to create jsonwebtoken
 * @param {*} payload 
 * @param {*} exp 
 * @returns 
 */
const CreateToken = (payload,SECRET_KEY,exp = '1d') => {
    let token;
    try {
        token = jwt.sign({
           data:payload
        }, SECRET_KEY, {
           expiresIn: exp
        })

    } catch (err) {
        return err
    }
    return token
}

/**
 * This function will help to verify jsonwebtoken
 * @param {*} token 
 * @returns 
 */
const VerifyToken = (token, SECRET_KEY) => {
    let decode;
    try {
        decode = jwt.verify(token, SECRET_KEY);
    } catch (err) {
        console.log(err)
    }
    return decode;
}


module.exports = {
    CreateToken,
    VerifyToken
}

