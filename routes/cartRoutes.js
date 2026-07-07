const express = require('express')
const cartController = require('../controllers/cartController.js')
const router = express.Router()

router.route('/')
    .post(cartController.addToCart)
    .get(cartController.getCart)

router.route('/:productId')
    .put(cartController.updateItemQuantity)
    .delete(cartController.removeItem)

module.exports = router