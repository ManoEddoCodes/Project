require('dotenv').config()
const mongoose = require('mongoose')
const connectDB = require('./db/connection.js')
const Category = require('./models/categoryModel.js')
const Product = require('./models/productModel.js')

async function seedDB() {
    try{
        await connectDB()

        await Category.deleteMany({})
        await Product.deleteMany({})

        const categories = await Category.insertMany([
        { name: 'Electronics', description: 'Gadgets'},
        { name: 'Video Games', description: 'Xbox Games'}
        ])

        const products = [
      { 
        name: 'Samsung S26 Ultra',
        owner: 'Samsung',
        price: 1299, 
        category: categories[0]._id,
        stock: 1000
      },
      { 
        name: 'GTA V',
        owner: 'Rockstar Games',
        price: 59, 
        category: categories[1]._id,
        stock: 500
      }
        ]
        await Product.insertMany(products)
        console.log("Database Seeding Complete")
    } catch (error){
        console.log("An errorhas occured while seeding:", error.message)
    } finally {
        await mongoose.connection.close()
        process.exit(0)
    }
}

seedDB()