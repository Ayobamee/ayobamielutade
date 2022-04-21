//import supertest
const request = require('supertest')
//import app resource to be tested
const app = require('../../app')
//import mockdata
const newTodo = require('../mock-data/new-todo.json')

//Assign the todos endpoint to variable
const endpointUrl = '/todos/'

// jest.setTimeout(40000)

describe(endpointUrl, () => {
  it('GET' + endpointUrl, async () => {
    const response = await request(app).get(endpointUrl)
    expect(response.statusCode).toBe(200)
    expect(Array.isArray(response.body)).toBeTruthy()
    expect(response.body[0].title).toBeDefined()
    expect(response.body[0].done).toBeDefined()
  })

  //This test is to create Todos
  it('POST ' + endpointUrl, async () => {
    const response = await request(app).post(endpointUrl).send(newTodo)
    expect(response.statusCode).toBe(201)
    expect(response.body.title).toBe(newTodo.title)
    expect(response.body.done).toBe(newTodo.done)
  })

  //This test is to check that error 500 is returned when wrong data is passed.
  it(
    'should return error 500 on malformed data with POST' + endpointUrl,
    async () => {
      const response = await request(app)
        .post(endpointUrl)
        .send({ title: 'Missing done property' })
      expect(response.statusCode).toBe(500)
      expect(response.body).toStrictEqual({
        message: 'Todo validation failed: done: Path `done` is required.',
      })
    }
  )
})
