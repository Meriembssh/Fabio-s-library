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
router.post('/', (req,res) => {
    res.send('Create')
})

module.exports = router