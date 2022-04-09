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
try{
mongoose.connect(process.env.MONGODB_URL)
.then(
  console.log("server started successfully")
)
}
catch(err){
  console.log(err)
}
//main route
app.get('/',(req, res)=>{
    res.send('<h1>Hello World</h1>')
})

//todo route
app.get('/todos',(req,res)=>{
  try{
    Todo.find()
  .then(result=>res.send(result))
  } catch(err){
    res.json("err:", err.message)
  }
  mongoose.connection.close()
})

// get todo by id
app.get('/todo/:id', (req, res)=>{
  const id = req.params.id
  Todo.findById({ _id: id })
  .then(result=>{
    res.send(result)
  })
})

//Add a new todo with post client
app.post('/todos',(req,res)=>{
    const newTodo = new Todo({
      todo: req.body.todo,
      completed: req.body.completed
    })
    newTodo.save()
      .then(result => res.send(result))
      .catch(err => res.status(401).json(err))
      mongoose.connection.close()
})

//

//listen to PORT
app.listen(PORT, ()=> console.log(`now running on ${PORT}`))
