const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String
        },
        publishedDate: {
            type: Date,
            required: true
        },
        pageCount: {
            type: Number,
            required: true
        },
        addedDate: {
            type: Date,
            required: true,
            default: Date.now
        },
        cocerImageName: {
            type: String,
            required: true
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Author'
        }
    }
)

module.exports = mongoose.model('book', bookSchema)