const express = require('express')
const router = express.Router()
const Book = require('../models/bookSchema')


//Getting all
router.get('/', async (req,res) => {
    try {
    const books =  await Book.find()
    res.json(books)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

//Getting One

router.get('/:id', getBook, (req, res) => {
    res.json(res.book)
})

//Creating One
router.post('/', async (req, res) => {
    const book = new Book({
        title: req.body.title,
        author: req.body.author,
        publicationDate: req.body.publicationDate,
        ISBN: req.body.ISBN
    })
try {
    const newBook = await book.save()
    res.status(201).json(newBook)
} catch (err) {
    res.status(400).json({ messag: err.message })
}
})
      
//Updating One

router.patch('/:id', getBook, async (req, res) => {
    if(req.body.title != null) {
        res.book.title = req.body.title
    }
    if (req.body.author != null) {
        res.book.author = req.body.author
    }
    if (req.body.publicationDate != null) {
        res.book.publicationDate = req.body.publicationDate
    }
    if (req.body.ISBN != null) {
        res.book.ISBN = req.body.ISBN
    }
    try{
        const updatedBook = await res.book.save()
        res.json(updatedBook)
    } catch(err) {
        res.status(400).json({ message: err.message })
    }
})


//Deletiing One

router.delete('/:id', getBook, async (req, res) => {
    try {
        await res.book.deleteOne()
        res.json({ message: 'Deleted Book' })
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
})

async function getBook(req, res, next){
    let book
    try {
        book = await Book.findById(req.params.id)
        if (book === null) {
            return res.status(404).json({ message: 'Cannot find Book'})
        }
    } catch (err) {
        return res.status(500).json({message: err.message})
    }

    res.book = book
    next()
}

module.exports = router

