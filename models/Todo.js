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

 todoSchema.set('toJSON',{
     transform: (document, returnedObject)=>{
         returnedObject.id= returnedObject._id;
         delete returnedObject._id
         delete returnedObject.__v
     }
 })

module.exports = mongoose.model('Todos', todoSchema)
