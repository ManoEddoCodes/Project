const mongoose = require("mongoose")

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: [true, "Order item must be linked to a product."],
  },
  name: {
    type: String,
    required: [true, "Order item must have a product name"],
  },
  price: {
    type: Number,
    required: [true, "Order item must record the product price."],
    min: [0, "Price cannot be negative."],
  },
  quantity: {
    type: Number,
    required: [true, "Order item must record the quantity purchased."],
    min: [1, "Minimum quantity is 1."],
  },
})

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      default: "default_user",
      required: true,
    },
    items: [orderItemSchema],
    totalPrice: {
      type: Number,
      required: [true, "An order must have a total price."],
    },
    status: {
      type: String,
      enum: {
        values: ["pending", "processing", "shipped", "delivered", "cancelled"],
        message:
          "Status must be either: pending, processing, shipped, delivered, or cancelled.",
      },
      default: "pending",
    },
    shippingAddress: {
      type: String,
      required: [true, "Please provide an address to ship to"],
      trim: true,
    },
  },
  {
    timestamps: true,
  },
)

module.exports = mongoose.model("Order", orderSchema)
