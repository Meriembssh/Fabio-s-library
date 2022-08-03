const mongoose = require('mongoose')

const coverImageBasePath = 'uploads/bookcovers'

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
        coverImageName: {
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
module.exports.coverImageBasePath = coverImageBasePath