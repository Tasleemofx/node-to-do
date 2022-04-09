const mongoose = require('mongoose');

 const todoSchema = new mongoose.Schema({
     todo: {
         type: String,
         required: true,
     },
     completed: {
         type: Boolean,
         default: false,
     },
     date:{
         type: Date,
         default: Date.now()
     }
 })

module.exports = mongoose.model('Todos', todoSchema)
