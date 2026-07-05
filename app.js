require('dotenv').config
const express = require('express')
const connectDB = require('./db/connection.js')
const app = express()
const PORT = process.env.PORT 

connectDB()

app.use(express.json())

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))