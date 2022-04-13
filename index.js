require('dotenv').config()
const express = require("express")
const mongoose = require('mongoose')
const morgan = require("morgan")
const cors = require('cors')

const app = express()
const Todo = require("./models/Todo")

const db = mongoose.connection
//PORT
const PORT = process.env.PORT || 3000

//express middleware
app.use(cors())
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
    res.status(404).json( err.message).end()
  }
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
  // check if todo item exists
    const findTodo = await Todo.exists({ todo: todoItem.todo})
    if(!todoItem.todo){
      return res.status(400).json("Please enter a todo item")
    }else if(findTodo){
      return res.status(409).json("Todo item already exists")
    }
    else{
    const newTodo = new Todo({
      ...todoItem
    })
    await newTodo.save()
      .then(result =>  {
        console.log("new item added")
        return res.send(newTodo)})
      .catch(err => res.status(401).json(err.message))
      }
  db.close()
})

app.delete('/todo/:id', async(req, res)=>{
  const id = req.params.id;
  console.log(id)
  db.close()
})

//

//listen to PORT
app.listen(PORT, ()=> console.log(`now running on ${PORT}`))
