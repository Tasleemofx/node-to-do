require('dotenv').config()
const express = require("express")
const mongoose = require('mongoose')
const morgan = require("morgan")
const app = express()
const Todo = require("./models/Todo")


//PORT
const PORT = process.env.PORT || 3000

//express middleware
app.use(express.json())
app.use(morgan('tiny'))
app.use(express.urlencoded({ extended: true}))

//connect mongo database

mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true}, ()=>
  console.log("server started successfully")
)

//todo route
app.get('/todos', async(req,res)=>{
  try{
    await Todo.find({})
  .then(result=>res.send(result))
  } catch(err){
    res.status(404).json( err.message)
  }
  mongoose.connection.close()
})

// get todo by id
app.get('/todo/:id', async(req, res)=>{
  const id = req.params.id
  await Todo.findById({ _id: id })
  .then(result=>{
    res.send(result)
  })
})

//Add a new todo with post client
app.post('/todos', async (req,res)=>{
    const todoItem = req.body
    const newTodo = new Todo({
      ...todoItem
    })
    await newTodo.save()
      .then(result =>  {
        console.log("new item added")
        return res.send(newTodo)})
      .catch(err => res.status(401).json(err.message))
      mongoose.connection.close()
})

//

//listen to PORT
app.listen(PORT, ()=> console.log(`now running on ${PORT}`))
