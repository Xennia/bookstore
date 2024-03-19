const express = require('express')
const router = express.Router()
const Author = require('../models/authorSchema')


//Getting all

router.get('/', async (req,res) => {
    try {
    const author =  await Author.find()
    res.json(author)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

//Getting One

router.get('/:id', getAuthor, (req, res) => {
    res.json(res.author)
})

//Creating One

router.post('/', async (req, res) => {
    const author = new Author({
        name: req.body.name,
        books: req.body.books,
        biography: req.body.biography,
    })
try {
    const newAuthor = await author.save()
    res.status(201).json(newAuthor)
} catch (err) {
    res.status(400).json({ messag: err.message })
}
})
      
//Updating One

router.patch('/:id', getAuthor, async (req, res) => {
    if(req.body.name != null) {
        res.author.name = req.body.name
    }
    if (req.body.books != null) {
        res.author.books = req.body.books
    }
    if (req.body.biography != null) {
        res.author.biography = req.body.biography
    }
    try{
        const updatedAuthor = await res.author.save()
        res.json(updatedAuthor)
    } catch(err) {
        res.status(400).json({ message: err.message })
    }
})


//Deletiing One

router.delete('/:id', getAuthor, async (req, res) => {
    try {
        await res.author.deleteOne()
        res.json({ message: 'Deleted Book' })
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
})

async function getAuthor(req, res, next){
    let author
    try {
        author = await Author.findById(req.params.id)
        if (author === null) {
            return res.status(404).json({ message: 'Cannot find Author'})
        }
    } catch (err) {
        return res.status(500).json({message: err.message})
    }

    res.author = author
    next()
}

module.exports = router

