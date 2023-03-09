const express = require('express');
const { GetAllProduct,CreateProduct } = require('../controllers/productController');
const { AuthCheck, AdminCheck } = require('../middlewares/authMiddleware');
const productRoute = express.Router();


// All category
productRoute.route('/get-all-product').get(GetAllProduct)

// single category
productRoute.route('/get-category/:slug').get(AuthCheck, AdminCheck, )


// create category
productRoute.route('/create-product').post(AuthCheck, AdminCheck, CreateProduct)


// update category
productRoute.route('/update-category/:id').put(AuthCheck, AdminCheck, )

// delete category
productRoute.route('/delete-category/:id').delete(AuthCheck, AdminCheck,)


module.exports = productRoute; 