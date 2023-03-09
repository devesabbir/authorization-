const CategoryModel = require("../models/categoryModel");
const slugify = require('slugify')

/**
 * Create Category
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const CreateCategory = async (req, res, next) => {

    try {
        const {
            name
        } = req.fields;

        if (!name) {
            res.status(400).json({
                message: 'Category name is required'
            })
        }

        if (name) {
            const category = await CategoryModel.findOne({
                name
            });
            if (category) {
                res.status(400).json({
                    message: 'Category already exists'
                })
            }
            if (!category) {
                const newCategory = await CategoryModel.create({
                    name,
                    slug: slugify(name)
                })

                res.status(201).json({
                    message: 'Category created successfully',
                    data: newCategory
                });
            }
        }
    } catch (error) {
        next(error);
    }
}


const UpdateCategory = async (req, res, next) => {
    try {
        const {
            name
        } = req.fields;
        const {
            id
        } = req.params;

        if (!name) {
            res.status(400).json({
                message: 'Category name is required'
            })
        }

        if (name) {

            if (id) {
                const updateCategory = await CategoryModel.findByIdAndUpdate(id, {
                    name,
                    slug: slugify(name)
                }, {
                    upsert: true
                });
                res.status(200).json({
                    message: 'Category updated successfully',
                    data: updateCategory
                })
            }

            if (!id) {
                res.status(400).json({
                    message: 'Category id is required'
                })
            }
        }

    } catch (error) {
        next(error)
    }
}



const  GetAllCategory = async (req, res, next) => {
    try {
        const categories = await CategoryModel.find();
        res.status(200).json({
            message:'All Category',
            data: categories
        })
    } catch (error) {
        next(error)
    }
}


const  GetSingleCategory = async (req, res, next) => {
    
    try {
        const {slug} = req.params
        const category = await CategoryModel.findOne({slug:slug});

        if (category) {
           res.status(200).json({
             message:'Single Category',
             data: category
           })
        }

        if (!category) {
            res.status(404).json({
                message: 'Category not found'
            })
        }
       
    } catch (error) {
        next(error)
    }
}

const DeleteCategory = async (req, res, next) => {
    try{
       const {id} = req.params;
       const isExist = await CategoryModel.findById(id);
       
       if(isExist){
           const deleteCategory = await CategoryModel.findByIdAndDelete(id);
           res.status(200).json({
           message: 'Category deleted successfully',
           data: deleteCategory
       })
       }

       if (!isExist) {
          res.status(404).json({
              message: 'Category not found'
          })
       }

       
    } catch (error) {
       next(error)
    }
}


module.exports = {
    CreateCategory,
    UpdateCategory,
    GetAllCategory,
    GetSingleCategory,
    DeleteCategory
}