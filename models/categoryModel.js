const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Category Name is required"],
            unique: [true, "Category already exists"],
            trim: true,
            minLength: [3, "Category Name must be at least 3 characters"]
        },

        description: {
            type: String,
            trim: true,
            required: [true, 'Please provide a description for this Category']
        },
        
        slug: {
            type: String,
            lowercase: true,
            trim: true
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Category", categorySchema)