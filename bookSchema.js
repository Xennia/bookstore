const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
        title: {
        type: String,
        required: true
    },
        author: {
        type: String,
        required: true
    },
        publicationDate: {
        type: String,
    
    }, ISBN: {
       type: Number,
    }
})

module.exports = mongoose.model('book', bookSchema)