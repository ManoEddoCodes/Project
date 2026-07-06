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

const getCategory = asyncHandler(async (req, res, next) => {
    const category = await Category.findById(req.params.id)

    if (!category){
        return next(new AppError('Cannot find a category with that id.', 404))
    }

    res.status(200).json({
        status: 'success',
        data: {category}
    })
})

const updateCategory = asyncHandler(async (req,res,next) => {
    const updatedCategory = await Category.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true
        }
    )
    if(!updatedCategory){
        return next(new AppError('Cannot find a category with that id.', 404))
    }

    res.status(200).json({
        status: 'success',
        data: {updatedCategory}
    })
})

const deleteCategory = asyncHandler(async (req, res, next) => {
    const {id} = req.params.id

    const category = await Category.findById(id)
    if (!category) {
        return next(new AppError('Cannot find a category with that id.', 404))
    }

    const hasProducts = await Product.exists({ category: Id })
    if (hasProducts) {
        return next(
            new AppError(`Cannot delete "${category.name}" because products are still linked to it.`, 400)
        )
    }

    await Category.findByIdAndDelete(id)

    res.status(200).json({
        status: 'success',
        message: 'Category deleted successfully'
    })
})

module.exports = { createCategory, getAllCategories, getCategory, updateCategory, deleteCategory }