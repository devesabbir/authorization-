const express = require('express');
const categoryRoute = require('./categoryRoute');
const productRoute = require('./productRoute');
const userRoute = require('./userRoute');
const allRoutes = express.Router()


allRoutes.use('/auth', userRoute)
allRoutes.use('/category', categoryRoute)
allRoutes.use('/product/', productRoute)


module.exports = allRoutes