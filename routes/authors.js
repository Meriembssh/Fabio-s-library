const express = require('express')
const Author = require('../models/author')
const router = express.Router()

// All authors:
router.get('/', (req,res) => {
    res.render('authors/index')
})

// New author:
router.get('/new', (req,res) => {
    res.render('authors/new', {author: new Author()})
})

// Create new author:
router.post('/', async (req,res) => {
    const author = new Author({
        name: req.body.name
    })
    try  {
        const newAuthor = await author.save()
        res.redirect(`authors/${newAuthor.id}`)
    } catch {
        res.render('authors/new', {
            author: author,
            errorMessage: 'Error creating Author'
        })
    }
})

module.exports = router