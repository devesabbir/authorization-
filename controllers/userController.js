const dotenv = require('dotenv');
dotenv.config({
    path: '../.env'
})

const UserModel = require("../models/userModel")
const CreateError = require("../utils/createError")
const {
    PasswordEncode,
    PasswordDecode
} = require("../utils/hashPassword")
const {
    CreateToken
} = require("../utils/token")


/**
 * this controlelr is for handle user creation
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const UserRegistration = async (req, res, next) => {

    try {
        const existingUser = await UserModel.findOne({
            $or: [{
                email: req.fields.email
            }, {
                phone: req.fields.phone
            }]
        })

        if (!existingUser) {
            const hassPass = PasswordEncode(req.fields.password)
            const user = await UserModel.create({
                ...req.fields,
                password: hassPass
            })

            if (user) {
                res.status(200)
                res.json({
                    message: 'Succcess',
                    data: user
                })
            }
        }

        if (existingUser) {
            next(CreateError(409, 'User allready exists!'))
        }

    } catch (err) {
        next(err)
    }
}


const UserLogin = async (req, res, next) => {
    const {
        email,
        password
    } = req.fields

    try {
        if (!email || !password) {
            next(CreateError(406, 'All field are required.'))
        } else {
            const user = await UserModel.findOne({
                email: email
            })
            if (!user) {
                next(CreateError(404, 'User not found.'))
            }

            if (user) {
                const match = PasswordDecode(password, user.password)

                if (!match) {
                    next(CreateError(403, 'Invalid password'))
                }

                if (match) {

                    // create token 
                    let payload = {
                        id: user._id,
                        email: user.email
                    }

                    const token = CreateToken(payload, process.env.SECRET_KEY)
                    res.status(200)

                    res.json({
                        message: 'Loggin successful',
                        data: {
                            name: user.name,
                            email: user.email,
                            phone: user.phone,
                            address: user.address,
                            role: user.role,
                      },
                        token: token
                    })
                }
            }
        }
    } catch (err) {
        next(err)
    }
}


const ForgotPassword = async (req, res, next) => {
    const {
        email,
        answer,
        newPassword
    } = req.fields
    try {
        if (!email || !answer || !newPassword) {

            if (!email) {
                res.status(400)
                res.json({
                    message: 'Email is required.'
                })
            }

            if (!answer) {
                res.status(400)
                res.json({
                    message: 'Answer is required.'
                })
            }
            if (!newPassword) {
                res.status(400)
                res.json({
                    message: 'New Password is required.'
                })
            }


        } else {
            // check 
           const user = await UserModel.findOne({email: email, answer:answer})
            
           if(!user) {
            res.status(404)
            res.json({
                message: 'User does not exist'
            })
           }

           if(user){
               const bcryptPass = PasswordEncode(newPassword) 
               const updatePass = await UserModel.updateOne({email:email, answer:answer}, {password:bcryptPass},{upsert:true})
               res.status(200)
               res.json({
                   message: 'Password updated successful',
                   data: user
               })
           }
          
        } 

    } catch (error) {
        next(error)
    }
}



module.exports = {
    UserRegistration,
    UserLogin,
    ForgotPassword
}