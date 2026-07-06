const Product = require('../models/productModel.js');
const asyncHandler = require('../utils/asyncHandler.js');
const AppError = require('../utils/appError.js');

const createProduct = asyncHandler(async(req, res, next) =>{
    const newProduct = await Product.create(req.body)
    req.status(201).json({
        status: 'success',
        message: 'Product created successfully',
        data: {product: newProduct}
    })
})

const getAllProducts = asyncHandler(async (req, res, next)=>{
    
})

const getProduct = asyncHandler(async(req, res, next) =>{

})

const updateProduct = asyncHandler(async(req,res,next) =>{

})

const deleteProduct = asyncHandler(async(req,res,next)=>{
    
})

module.exports = { createProduct, getAllProducts, getProduct, updateProduct, deleteProduct }