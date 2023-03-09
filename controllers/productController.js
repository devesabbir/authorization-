const slugify = require("slugify");
const fs = require("fs");
const ProductModel = require("../models/productModel");


/**
 * Create a new product
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const CreateProduct = async (req, res, next) => {
    try {
        const {
            name,
            description,
            price,
            category,
            quantity,
            shipping
        } = req.fields

        const {
            photo
        } = req.files
        // validation
        switch (true) {
            case !name:
                return res.status(500).send({
                    error: "Name is required"
                })
            case !description:
                return res.status(500).send({
                    error: "Description is required"
                })
            case !price:
                return res.status(500).send({
                    error: "Price is required"
                })
            case !category:
                return res.status(500).send({
                    error: "Category is required"
                })
            case !quantity:
                return res.status(500).send({
                    error: "Quantity is required"
                })
            case !shipping:
                return res.status(500).send({
                    error: "Shipping is required"
                })

        }

        const product = new ProductModel({
            ...req.fields,
            slug: slugify(name),

        })
        if (photo) {
            product.photo.data = fs.readFileSync(photo.path);
            product.photo.contentType = photo.type
        }

        await product.save()
        res.status(200)
        res.json({
            message: "Product created successfully",
            data: product
        })

    } catch (error) {
        next(error);
    }
}

/**
 * Get All Products
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const GetAllProduct = async (req, res, next) => {

    try {
        const search = req.query.search || '';
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;

        // Pagination
        const skip = (page - 1) * limit;
        const products = await ProductModel.find({
            name: {
               $regex: search,
               $options: 'i' 
            }
        }).populate('category').select('-photo').skip(skip).limit(limit);
        
        res.status(200)
        res.json({
            message: "Products fetched successfully",
            data: products,
            count: products.length
        })

    } catch (error) {
        next(error)
    }
}




module.exports = {
    CreateProduct,
    GetAllProduct
}