//Import express
const express = require('express')
//Import todo route
const todoRoutes = require('./routes/todo.routes')
const app = express()
const mongodb = require('./mongodb/mongodb.connect')
const res = require('express/lib/response')

//connect to mongo db
mongodb.connect()

app.use(express.json())

app.use('/todos', todoRoutes)

app.use((error, req, res, next) => {
  console.log(error)
  res.status(500).json({ message: error.message })
})

//Set up Helloworld route in express application
app.get('/', (req, res) => {
  //expected to return json
  res.json('Hello world!')
})

module.exports = app
