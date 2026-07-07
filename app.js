require('dotenv').config()
const express = require('express')
const mongoSanitize = require('express-mongo-sanitize')
const errorHandler = require('./middlewares/errorHandler.js')

const categoryRouter = require('./routes/categoryRoutes.js')
const productRouter = require('./routes/productRoutes.js')
const cartRouter = require('./routes/cartRoutes.js')
const orderRouter = require('./routes/orderRoutes.js')
const connectDB = require('./db/connection.js')

const PORT = process.env.PORT
const NODE_ENV = process.env.NODE_ENV

const app = express()

app.use(express.json())

app.use(mongoSanitize())

app.use('/api/categories', categoryRouter)
app.use('/api/products', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/orders', orderRouter)

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
})

app.use(errorHandler)

connectDB().then( () => {
    app.listen(PORT, () => console.log(`Server is running in ${NODE_ENV} mode on port ${PORT}`))
})
