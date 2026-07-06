const express = require('express')
const categoryController = require('../controllers/categoryController.js')
const router = express.Router()

router.route('/')
    .post(categoryController.createCategory)
    .get(categoryController.getAllCategories)

router.route('/:id')
    .get(categoryController.getCategory)
    .put(categoryController.updateCategory)
    .delete(categoryController.deleteCategory)

module.exports = router