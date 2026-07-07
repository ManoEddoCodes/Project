const Cart = require("../models/cartModel.js")
const Product = require("../models/productModel.js")
const AppError = require("../utils/appError.js")
const asyncHandler = require("../utils/asyncHandler.js")

const calculateTotalPrice = async (cart) => {
  let total = 0
  await cart.populate("items.product")

  cart.items.forEach((item) => {
    if (item.product) {
      total += item.product.price * item.quantity
    }
  })

  cart.totalPrice = Math.round(total * 100) / 100
}

const getCart = asyncHandler(async (req, res, next) => {
  const userId = req.user?.id || "default_user"

  let cart = await Cart.findOne({ userId }).populate("items.product")

  if (!cart) {
    cart = await Cart.create({ userId, items: [], totalPrice: 0 })
  }

  res.status(200).json({
    status: "success",
    message: "Cart created successfully",
    data: { cart },
  });
});

const addToCart = asyncHandler(async (req, res, next) => {
  const userId = req.user?.id || "default_user"
  const { productId, quantity = 1 } = req.body

  const product = await Product.findById(productId)
  if (!product) {
    return next(new AppError("Product not found.", 404))
  }

  let cart = await Cart.findOne({ userId })
  if (!cart) {
    cart = new Cart({ userId, items: [], totalPrice: 0 })
  }

  const itemIndex = cart.items.findIndex(
    (item) => item.product.toString() === productId,
  )

  if (itemIndex > -1) {
    cart.items[itemIndex].quantity += Number(quantity)
  } else {
    cart.items.push({ product: productId, quantity: Number(quantity) })
  }

  await calculateTotalPrice(cart)
  await cart.save()

  res.status(200).json({
    status: "success",
    message: "Added to cart",
    data: { cart },
  })
})

const updateItemQuantity = asyncHandler(async (req, res, next) => {
  const userId = req.user?.id || "default_user"
  const { productId } = req.params
  const { quantity } = req.body

  if (quantity < 1) {
    return next(new AppError("Quantity must be at least 1.", 400))
  }

  const cart = await Cart.findOne({ userId })
  if (!cart) {
    return next(new AppError("Cart not found.", 404))
  }

  const itemIndex = cart.items.findIndex(
    (item) => item.product.toString() === productId,
  );
  if (itemIndex === -1) {
    return next(new AppError("Product not found in cart.", 404))
  }

  cart.items[itemIndex].quantity = Number(quantity)

  await calculateTotalPrice(cart)
  await cart.save()

  res.status(200).json({
    status: "success",
    message: "Item Quantity updated",
    data: { cart },
  })
})

const removeItem = asyncHandler(async (req, res, next) => {
  const userId = req.user?.id || "default_user"
  const { productId } = req.params

  const cart = await Cart.findOne({ userId })
  if (!cart) {
    return next(new AppError("Cart not found.", 404))
  }
  cart.items = cart.items.filter(
    (item) => item.product.toString() !== productId,
  )

  await calculateTotalPrice(cart)
  await cart.save()

  res.status(200).json({
    status: "success",
    message: "Item removed from cart",
    data: { cart },
  })
})

module.exports = { getCart, addToCart, updateItemQuantity, removeItem }
