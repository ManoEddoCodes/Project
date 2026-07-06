const Category = require('../models/categoryModel.js')
const asyncHandler = require('../utils/asyncHandler.js')
const AppError = require('../utils/appError.js')

const createCategory = asyncHandler(async (req, res, next) => {
    const { name, description, slug} = req.body

    const categorySlug = slug || 
    [ ' ', '/', '%', '$', '#', '@', '!', '^', '&', '*', '(', ')', '_', '+', '=', 
        '[', ']', '{', '}', '<', '>', '?', '~', '`', '\\', '|', ':', ';', "'", '"', ',' ]
        .reduce((str, char) => str.replaceAll(char, '-').name.toLowerCase())
        .split('-')
        .filter(Boolean)
        .join('-')
    
        const newCategory = await Category.create({
            name,
            description,
            slug: categorySlug
        })

        res.status(201).json({
            status: 'success',
            message: 'Category created successfully',
            data: {category: newCategory}
        })
})

const getAllCategories = asyncHandler(async (req,res,next) => {
    const categories = await Category.find()
    res.status(200).json({
        status: 'success',
        message: 'Categories retrieved successfully',
        data: {categories}
    })
})

module.exports = { createCategory, getAllCategories }