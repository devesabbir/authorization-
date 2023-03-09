const express = require('express');
const formidable = require('formidable');

const { UserRegistration, UserLogin, ForgotPassword } = require('../controllers/userController');
const { AuthCheck, AuthorizedUser, AdminCheck } = require('../middlewares/authMiddleware');
const userRoute = express.Router()



userRoute.route('/register').post(UserRegistration)
userRoute.route('/login').post(UserLogin)
userRoute.route('/forgot-pass').post(ForgotPassword)

// Authorizes user to access routes
userRoute.route('/me').get(AuthCheck, AuthorizedUser )
userRoute.route('/admin').get(AuthCheck, AdminCheck, AuthorizedUser )

module.exports = userRoute