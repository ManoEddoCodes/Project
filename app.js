require('dotenv').config()
const express = require('express')
const errorHandler = require('./middlewares/errorHandler.js')
const AppError = require('./utils/appError.js')

const categoryRouter = require('./routes/categoryRoutes.js')
const productRouter = require('./routes/productRoutes.js')
const cartRouter = require('./routes/cartRoutes.js')
const orderRouter = require('./routes/orderRoutes.js')
const connectDB = require('./db/connection.js')

const PORT = process.env.PORT
const NODE_ENV = 'production'

const app = express()

app.use(express.json())

app.use('/api/categories', categoryRouter)
app.use('/api/products', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/orders', orderRouter)

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Homepage'
  })
})

app.use((req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404))
})

app.use(errorHandler)

connectDB().then( () => {
    app.listen(PORT, () => console.log(`Server is running in ${NODE_ENV} mode on port ${PORT}`))
})
