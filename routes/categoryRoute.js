const express = require('express');
const categoryRoute = express.Router();

const { CreateCategory, UpdateCategory, GetAllCategory, GetSingleCategory,DeleteCategory} = require('../controllers/categoryController');
const { AuthCheck, AdminCheck, AuthorizedUser } = require('../middlewares/authMiddleware');


// All category
categoryRoute.route('/get-all-category').get(AuthCheck, AdminCheck, GetAllCategory)

// single category
categoryRoute.route('/get-category/:slug').get(AuthCheck, AdminCheck, GetSingleCategory)


// create category
categoryRoute.route('/create-category').post(AuthCheck, AdminCheck, CreateCategory)


// update category
categoryRoute.route('/update-category/:id').put(AuthCheck, AdminCheck, UpdateCategory)

// delete category
categoryRoute.route('/delete-category/:id').delete(AuthCheck, AdminCheck, DeleteCategory)


module.exports = categoryRoute; 