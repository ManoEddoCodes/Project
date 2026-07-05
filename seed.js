require('dotenv').config()
const mongoose = require('mongoose')
const connectDB = require('./db/connection.js')
const Category = require('./models/categoryModel.js')
const Product = require('./models/productModel.js')

async function seedDB() {
    try{
        await connectDB()

        if(mongoose.connection.collections['orders']){
          await mongoose.connection.collection('orders').deleteMany({})
        }

        await Category.deleteMany({})
        await Product.deleteMany({})

        const categories = await Category.insertMany([
        { name: 'Electronics', description: 'Gadgets & Devices', slug: 'electronics'},
        { name: 'Video Games', description: 'Xbox Games', slug: 'video-games'},
        { name: 'Clothing', description: 'Shirts, Jeans & more', slug: 'clothing'}
        ])

        const products = [
        { 
          name: 'Samsung S26 Ultra',
          owner: 'Samsung',
          price: 1299, 
          category: categories[0]._id,
          stock: 1000,
          slug: 'samsung-s26-ultra'
        },
        {
          name: 'iPhone 17 Pro Max',
          owner: 'Apple',
          price: 1199,
          category: categories[0]._id,
          stock: 1500,
          slug: 'iphone-17-pro-max'
        },
        {
          name: 'Minecraft',
          owner: 'Microsoft',
          price: 19,
          category: categories[1]._id,
          stock: 750,
          slug: 'minecraft'
        },
        { 
          name: 'GTA V',
          owner: 'Rockstar Games',
          price: 59, 
          category: categories[1]._id,
          stock: 500,
          slug: 'gta-v'
        },
        {
          name: 'Navy Blue Hoodie',
          owner: 'American Eagle',
          price: 29,
          category: categories[2]._id,
          stock: 150,
          slug: 'navy-blue-hoodie'
        },
        {
          name: 'White Sneakers',
          owner: 'Adidas',
          price: 110,
          category: categories[2]._id,
          stock: 600,
          slug: 'white-sneakers'
        }
      ]
        await Product.insertMany(products)
        console.log("Database Seeding Complete")
    } catch (error){
        console.log("An errorhas occured while seeding:", error.message)
    } finally {
        await mongoose.disconnect()
        process.exit(0)
    }
}

seedDB()