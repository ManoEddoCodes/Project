const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Category Name is required"],
            unique: [true, "Category already exists"],
            trim: true
        },

        description: {
            type: String
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