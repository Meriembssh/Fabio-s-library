const express = require('express')
const Book = require('../models/book')
const Author = require('../models/author')
const router = express.Router()
const path = require('path')
const uploadPath = path.join('public', Book.coverImageBasePath)
const multer = require('multer')
const imageMimeTypes= ['images/jpeg','images/png', 'images/gif']
const upload = multer({
    dest: uploadPath,
    fileFilter: (req,file,callback) => {
        callback(null, imageMimeTypes.includes(file.mimetype))
    }
})


// All books:
router.get('/', async (req, res) => {
    let query = Book.find()
    if (req.query.title != null && req.query.title != '') {
      query = query.regex('title', new RegExp(req.query.title, 'i'))
    }
    if (req.query.publishedBefore != null && req.query.publishedBefore != '') {
      query = query.lte('publishDate', req.query.publishedBefore)
    }
    if (req.query.publishedAfter != null && req.query.publishedAfter != '') {
      query = query.gte('publishDate', req.query.publishedAfter)
    }
    try {
      const books = await query.exec()
      res.render('books/index', {
        books: books,
        searchOptions: req.query
      })
    } catch {
      res.redirect('/')
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
router.post('/', upload.single('cover'), async (req,res) => {

    const fileName = req.file != null ? req.file.filename : null
    const book = new Book({
        title: req.body.title,
        author: req.body.author,
        publishedDate: new Date(req.body.publishedDate),
        pageCount: req.body.pageCount,
        description: req.body.description,
        coverImageName: fileName
    })
    try {
        const newBook = await book.save()
        res.redirect(`books/${newBook.id}`)
    } catch {
        if (book.coverImageName != null) {
            removeBookCover(book.coverImageName)
        }
        renderNewPage(res, book, true)
    }
})
    
function removeBookCover(fileName) {
    fs.unlink(path.join(uploadPath, fileName), err => {
        if (err) console.error(err)
    })
}

async function renderNewPage(res, book, hasError = false) {
    try {
        const authors = await Author.find({})
        const params = {
        authors: authors,
        book: book
        }
        if (hasError) params.errorMessage = 'Error Creating Book'
        res.render('books/new', params)
    } catch {
        res.redirect('/books')
    }
}

module.exports = router