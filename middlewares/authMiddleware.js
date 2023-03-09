const UserModel = require("../models/userModel");
const CreateError = require("../utils/createError");
const {
    VerifyToken
} = require("../utils/token");


/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const AuthCheck = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            next(CreateError(401, 'Unauthorized'))
        } else {
            const token = req.headers.authorization.split(' ')[1]
            const verify = VerifyToken(token, process.env.SECRET_KEY)

            if (!verify) {
                next(CreateError(401, 'Unauthorized user invalid token'))
            }

            if (verify) {
                req.login = verify.data
                next()
            }
        }
    } catch (err) {
        next(err);
    }

}



/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const AdminCheck = async (req, res, next) => {

    try {
        const admin = await UserModel.findById(req.login.id)
        if (admin.role !== 1) {
            next(CreateError(400, 'only admin can access this'))
        }
        if (admin.role === 1) {
            next()
        }

    } catch (err) {
        next(err);
    }
}

// Return Authorized access
const AuthorizedUser = (req, res) => {
    return res.status(200).send({ success: true })
}



module.exports = {
    AuthCheck,
    AdminCheck,
    AuthorizedUser
}