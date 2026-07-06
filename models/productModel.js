const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
       name: {
        type: String,
        required: [true, "Product Name is required"],
        trim: true
        },

        owner: {
        type: String,
        required: [true, "Owner Name is required"],
        trim: true
        },

        description: {
          type: String,
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
        min: [0, "Stock cannot be negative"]
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