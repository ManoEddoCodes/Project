const mongoose = require('mongoose')

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: [true, 'You must choose a product to put in your cart']
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required.'],
    min: [1, 'Please add at least 1 item.'],
    default: 1,
    validate: {
      validator: Number.isInteger,
      message: 'Quantity must be a whole number'
    }
  }
})

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      default: 'default_user',
      required: true,
      unique: true
    },
    items: [cartItemSchema],
    totalPrice: {
      type: Number,
      required: true,
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Cart', cartSchema)