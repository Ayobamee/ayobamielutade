//Import Todomodel
const TodoModel = require('../model/todo.model')

//Create the createTodo function
exports.createTodo = async (req, res, next) => {
  try {
    //Assign the created model
    const createdModel = await TodoModel.create(req.body)
    res.status(201).json(createdModel)
  } catch (err) {
    next(err)
  }
}

exports.getTodos = async (req, res, next) => {
  try {
  const allTodos = await TodoModel.find({})
  res.status(200).json(allTodos)
  } catch(err) {
    next(err)
  }
}
  

