require('dotenv').config()
const mongoose = require('mongoose')
const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGODB_URI)
    
    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.error(`Database Connection Error: ${error.message}`)
    process.exit(1)
  }
}

module.exports = connectDB