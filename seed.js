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

        await Product.deleteMany({})
        await Category.deleteMany({})

        const categories = await Category.insertMany([
        { name: 'Electronics', description: 'Gadgets & Devices', slug: 'electronics'},
        { name: 'Video Games', description: 'Xbox Games', slug: 'video-games'},
        { name: 'Clothing', description: 'Shirts, Jeans & more', slug: 'clothing'}
        ])

        const products = [
        { 
          name: 'Samsung S26 Ultra',
          owner: 'Samsung',
          description: 'Better than iPhone 17 Pro Max',
          price: 1299, 
          category: categories[0]._id,
          stock: 1000,
          slug: 'samsung-s26-ultra'
        },
        {
          name: 'iPhone 17 Pro Max',
          owner: 'Apple',
          description: 'Best way to flex on friends',
          price: 1199,
          category: categories[0]._id,
          stock: 1500,
          slug: 'iphone-17-pro-max'
        },
        {
          name: 'Minecraft',
          owner: 'Microsoft',
          description: 'If you have not heard of it then what have you been doing with your life',
          price: 19,
          category: categories[1]._id,
          stock: 750,
          slug: 'minecraft'
        },
        { 
          name: 'GTA V',
          owner: 'Rockstar Games',
          description: 'Bro bought GTA V before GTA VI',
          price: 59, 
          category: categories[1]._id,
          stock: 500,
          slug: 'gta-v'
        },
        {
          name: 'Navy Blue Hoodie',
          owner: 'American Eagle',
          description: 'Family Friendly Budget :D',
          price: 29,
          category: categories[2]._id,
          stock: 150,
          slug: 'navy-blue-hoodie'
        },
        {
          name: 'White Sneakers',
          owner: 'Adidas',
          description: 'You must be a professional athlete or just try to flex',
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