const express = require('express')
const Book = require('../models/book')
const Author = require('../models/author')
const router = express.Router()

// All books:
router.get('/', async (req, res) => {
    res.render('books/index', {book: new Book()})
    let searchOptions = {}
    try {

    } catch {

    }
  })

// New book:
router.get('/new', async (req,res) => {
    try {
        const authors = await Author.find({})
        const book = new Book()
        res.render('books/new', {
            book: book,
            authors: authors
        })
    } catch {
        res.redirect('/books')
    }
    
})

// Create new book:
router.post('/', async (req,res) => {
    const book = new book({
        name: req.body.name
    })
    try  {

    } catch {

    }
})

module.exports = router