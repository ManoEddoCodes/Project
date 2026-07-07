const Order = require('../models/orderModel.js')
const Cart = require('../models/cartModel.js')
const AppError = require('../utils/appError.js')
const asyncHandler = require('../utils/asyncHandler.js')

const createOrder = asyncHandler(async (req, res, next) => {
    const userId = req.user?.id || 'default_user'
    const { shippingAddress } = req.body

    if (!shippingAddress) {
        return next(new AppError('Please provide a shipping address.', 400))
    }

    const cart = await Cart.findOne({ userId }).populate('items.product')
  
    if (!cart || cart.items.length === 0) {
        return next(new AppError('Your cart is empty.', 400))
    }

    const orderItems = cart.items.map(item => {
        if (!item.product) {
            return next(new AppError('One of the products in your cart no longer exists.', 404))
        }
        return {
            product: item.product._id,
            name: item.product.name, 
            price: item.product.price,  
            quantity: item.quantity
        }
    })

    const newOrder = await Order.create({
        userId,
        items: orderItems,
        totalPrice: cart.totalPrice,
        shippingAddress
    })

    cart.items = []
    cart.totalPrice = 0
    await cart.save()

    res.status(201).json({
        status: 'success',
        message: 'order created successfully',
        data: { order: newOrder }
    })
})

const getOrders = asyncHandler(async (req, res, next) => {
    const userId = req.user?.id || 'default_user'

    const orders = await Order.find({ userId }).sort('-createdAt')

    res.status(200).json({
        status: 'success',
        results: orders.length,
        data: { orders }
    })
})

const getOrder = asyncHandler(async (req, res, next) => {
    const userId = req.user?.id || 'default_user'
  
    const order = await Order.findOne({ _id: req.params.id, userId })

    if (!order) {
        return next(new AppError('No order found with that ID.', 404))
    }

    res.status(200).json({
        status: 'success',
        data: { order }
    })
})

const updateOrderStatus = asyncHandler(async (req, res, next) => {
    const { status } = req.body

    const updatedOrder = await Order.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true, runValidators: true }
    )

    if (!updatedOrder) {
        return next(new AppError('No order found with that ID.', 404))
    }

    res.status(200).json({
        status: 'success',
        data: { order: updatedOrder }
    })
})

module.exports = {createOrder, getOrders, getOrder, updateOrderStatus}