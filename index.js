require('dotenv').config()
const express = require("express")
const mongoose = require("mongoose")
const app = express()
const todos = require("./todos")

//PORT
const PORT = process.env.PORT || 3000

//express middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false}))


//main route
app.get('/',(req, res)=>{
    res.send('<h1>Hello World</h1>')
})

//todo route
app.get('/todos',(req,res)=>{
  return res.send(todos)
})

// get todo by id
app.get('/todo/:id', (req, res)=>{
  const id = req.params.id
  const searchItem = todos.filter(item=> Number(item.id) === Number(id))
  if(searchItem.length > 0){
  return res.send(searchItem)
}else{
  return res.status(404).json({
    message: "Todo Item not found"
  })
}
})

//Add a new todo with post client
app.post('/todos',(req,res)=>{
  const newId = todos.length++;
  const todo = req.body.todo
  const checkTodo = todos.find(item=> item.todo == todo)
  const newTodo ={
    id: newId,
    todo: req.body.todo,
    completed: false
  }

  if(!newTodo.todo){
    return res.status(400).json({
      message: "please provide a todo item"
    })
  }else if(newTodo.todo && checkTodo){
    return res.status(400).json({
      message: "Todo already exists"
    })
  }else{
  todos.push(newTodo)
  return res.send(todos).status(200)
} 
})

//

//listen to PORT
app.listen(PORT, ()=> console.log(`now running on ${PORT}`))
