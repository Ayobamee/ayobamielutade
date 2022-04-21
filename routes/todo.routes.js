//Import express
const express = require('express')
//Import the todo controller
const todoController = require('../controllers/todo.controller')
const router = express.Router()

//Create a post request and call the create do controller
router.post('/', todoController.createTodo)
router.get('/', todoController.getTodos)

module.exports = router
