require('dotenv').config
const express = require('express')
const mongoSanitize = require('express-mongo-sanitize')
const connectDB = require('./db/connection.js')

const app = express()

app.use(express.json())

// app.use(mongoSanitize()) //broken

app.use('/api/categories', require('./routes/categoryRoutes.js'))
// app.use('/api/products', require('./routes/productRoutes.js'))

// need 404

// need error handler

app.use(express.json())

const PORT = process.env.PORT
const NODE_ENV = process.env.NODE_ENV
connectDB().then( () => {
    app.listen(PORT, () => console.log(`Server is running in ${NODE_ENV} mode on port ${PORT}`))
})
