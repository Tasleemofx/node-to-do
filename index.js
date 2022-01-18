const express = require("express")
const mongoose = require("mongoose")
const app = express()
const PORT = 3000
app.use(express.json())
// app.use(dotenv())


app.get('/',(req, res)=>{
    res.send('<h1>Hello World</h1>')
})


app.listen(PORT, ()=> console.log(`now running on ${PORT}`))