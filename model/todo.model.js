const mongoose = require('mongoose')
//Creating a TodoSchema using mongoose.
const TodoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  done: {
    type: Boolean,
    required: true,
  },
})

//Making a collections inside our mongoose database called Todo
const TodoModel = mongoose.model('Todo', TodoSchema)

module.exports = TodoModel
