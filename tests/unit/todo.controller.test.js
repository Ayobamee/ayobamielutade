//Import the TodoController(file to be tested)
const TodoController = require('../../controllers/todo.controller')
//Import mongoose model, we plan to test if our code works
const TodoModel = require('../../model/todo.model')
//Import mocks for response, request and error handling while communicating with middleware.
const httpMocks = require('node-mocks-http')
//Import new-todo json
const newTodo = require('../mock-data/new-todo.json')

const allTodos = require('../mock-data/all-todos.json')

//Create mock and override implementation using jest.fn and spy to see if create method is called.
TodoModel.create = jest.fn()
TodoModel.find = jest.fn()

//Declared the request, response and next variables.
let req, res, next
//Ensure the initialization of request, response http mocks and next variable are in the before each function.
beforeEach(() => {
  req = httpMocks.createRequest()
  res = httpMocks.createResponse()
  next = jest.fn()
})

describe('TodoController.getTodos', () => {
  it('should have a getTodos function', () => {
    expect(typeof TodoController.getTodos).toBe('function')
  })
  it('should call Todomodel.find({})', async () => {
    await TodoController.getTodos(req, res, next)
    expect(TodoModel.find).toHaveBeenCalledWith({})
  })

  it('should return response with status 200 and all todos',async () => {
    TodoModel.find.mockReturnValue(allTodos)
    await TodoController.getTodos(req,res,next)
    expect(res.statusCode).toBe(200)
    expect(res._isEndCalled()).toBeTruthy()
    expect(res._getJSONData()).toStrictEqual(allTodos)
  })
})

//Describe that we are testing the todocontroller
//The TodoController instance is used for the test
describe('TodoController.createTodo', () => {
  beforeEach(() => {
    //Create a request body and assign to the imported mocked-data
    req.body = newTodo
  })
  //Test to confirm if we have the createTodo function in the todo.controller implementation
  it('should have a createTodo function', () => {
    expect(typeof TodoController.createTodo).toBe('function')
  })

  //Test to confirm if the createTodo function tries to create a model
  it('should call TodoModel.create', () => {
    //Create a request body and assign to the imported mocked-data
    TodoController.createTodo(req, res, next)
    expect(TodoModel.create).toBeCalledWith(newTodo)
  })

  //Test to confirm response code 201 is returned and that a response is sent back
  it('should return 201 response code', async () => {
    await TodoController.createTodo(req, res, next)
    expect(res.statusCode).toBe(201)
    expect(res._isEndCalled()).toBeTruthy()
  })
  //Test to confirm that json body is returned
  it('should return json body in response', async () => {
    TodoModel.create.mockReturnValue(newTodo)
    await TodoController.createTodo(req, res, next)
    expect(res._getJSONData()).toStrictEqual(newTodo)
  })

  it('should handle errors', async () => {
    const errorMessage = { message: 'Done property missing' }
    const rejectedPromise = Promise.reject(errorMessage)
    TodoModel.create.mockReturnValue(rejectedPromise)
    await TodoController.createTodo(req, res, next)
    expect(next).toBeCalledWith(errorMessage)
  })


it('should handle errors in get Todos', async () => {
  const errorMessage = { message: 'Error finding' }
  const rejectedPromise = Promise.reject(errorMessage)
  TodoModel.find.mockReturnValue(rejectedPromise)
  await TodoController.getTodos(req, res, next)
  expect(next).toBeCalledWith(errorMessage)
})
})



