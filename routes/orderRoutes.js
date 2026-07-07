const express = require("express")
const orderController = require("../controllers/orderController.js")
const router = express.Router()

router
  .route("/")
  .post(orderController.createOrder)
  .get(orderController.getOrders)

router
  .route("/:id")
  .get(orderController.getOrder)

router.route('/:id/status')
  .put(orderController.updateOrderStatus)

module.exports = router
