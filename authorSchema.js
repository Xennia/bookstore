const mongoose = require('mongoose')

const authorSchema = new mongoose.Schema({
        name: {
        type: String,
        
    },
        books: {
        type: Array,
        default: [],

    },
        biography: {
        type: String,
    }
})

module.exports = mongoose.model('author', authorSchema)