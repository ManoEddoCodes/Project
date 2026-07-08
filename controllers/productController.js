const Product = require("../models/productModel.js")
const asyncHandler = require("../utils/asyncHandler.js")
const AppError = require("../utils/appError.js")

const createProduct = asyncHandler(async (req, res, next) => {
  const newProduct = await Product.create(req.body)
  res.status(201).json({
    status: "success",
    message: "Product created successfully",
    data: { product: newProduct },
  })
})

const getAllProducts = asyncHandler(async (req, res, next) => {
  const filter = {}
  const { category, minPrice, maxPrice, search } = req.query

  if (category) {
    filter.category = category
  }

  if (minPrice || maxPrice) {
    filter.price = {}
    if (minPrice) {
      filter.price.$gte = Number(minPrice)
    }
    if (maxPrice) {
      filter.price.$lte = Number(maxPrice)
    }
  }

  if (search) {
    filter.name = { $regex: search, $options: "i" }
  }

  const products = await Product.find(filter).populate("category")

  res.status(200).json({
    status: "success",
    message: "Products retrieved successfully",
    data: { products },
  })
})

const getProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id).populate("category")

  if (!product) {
    return next(new AppError("No Product found with that ID", 404))
  }

  res.status(200).json({
    status: "success",
    message: "Product found successfully",
    data: { product },
  })
})

const updateProduct = asyncHandler(async (req, res, next) => {
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    },
  ).populate("category")

  if (!updatedProduct) {
    return next(new AppError("No product found with that ID", 404))
  }

  res.status(200).json({
    status: "success",
    message: "Product Updated sucessfully",
    data: { product: updatedProduct },
  })
})

const deleteProduct = asyncHandler(async (req, res, next) => {
  const deletedProduct = await Product.findByIdAndDelete(req.params.id)

  if (!deletedProduct) {
    return next(new AppError("No product found with that ID", 404))
  }

  res.status(200).json({
    status: "success",
    message: "Product deleted successfully",
  })
})

module.exports = {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
}
