require('dotenv').config()
const express = require('express')
const mongoSanitize = require('express-mongo-sanitize')
const errorHandler = require('./middlewares/errorHandler.js')

const app = express()

app.use(express.json())

// app.use(
//   mongoSanitize({
//     allowDots: true,
//     replaceWith: '_',
//     dryRun: false 
//   })
// ) //BROKEN

const categoryRouter = require('./routes/categoryRoutes.js')
const productRouter = require('./routes/productRoutes.js')
const cartRouter = require('./routes/cartRoutes.js')
const orderRouter = require('./routes/orderRoutes.js')

app.use('/api/categories', categoryRouter)
app.use('/api/products', productRouter)

// need 404

app.use(errorHandler)

const connectDB = require('./db/connection.js')
const PORT = process.env.PORT
const NODE_ENV = process.env.NODE_ENV
connectDB().then( () => {
    app.listen(PORT, () => console.log(`Server is running in ${NODE_ENV} mode on port ${PORT}`))
})
