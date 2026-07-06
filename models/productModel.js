const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
       name: {
        type: String,
        required: [true, "Product Name is required"],
        trim: true,
        minLength: [3, "Product Name must be at least 3 characters"]
        },

        owner: {
        type: String,
        required: [true, "Owner Name is required"],
        trim: true,
        minLength: [3, "Owner Name must be at least 3 characters"]
        },

        description: {
          type: String,
          required: [true, 'Please provide a description for this Product'],
          trim: true
        },

        price: {
        type: Number,
        required: [true, "Product Price is required"],
        min: [0, "Price cannot be negative"] 
        },

        category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: [true, "Product Category is required"]
        },

        stock: {
            type: Number,
            default: 1,
            min: [0, "Stock cannot be negative"],
            validate: {
                validator: Number.isInteger,
                message: 'Stock quantity must be a whole number (integer). You cannot have half a product!'
            }
        },
        
        inStock: {
            type: Boolean,
            default: true
        },

        slug: {
            type: String,
            lowercase: true,
            trim: true
        },
        
        images: [{
            type: String
        }]
    }, 
    { 
        timestamps: true 
    }
);

module.exports = mongoose.model('Product', productSchema);