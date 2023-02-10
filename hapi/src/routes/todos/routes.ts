// definir as rotas

import type { ServerRoute, Request } from '@hapi/hapi'
import { Todo, getAll, getOne, create, update, remove, search } from './service'

/**
 * Get all todos
 * @handle `GET /`
 */

// Get a all todos
const getAllTodos = Object.freeze<ServerRoute>({
  method: 'GET',
  path: '/',
  handler: (req, _h) => {
    // get data from request
    const { mongo } = req
    const limit = Number(req.query['limit']) ?? 5
    const offset = Number(req.query['offset']) ?? 0

    // call handler (request-agnostic)
    return getAll(mongo, offset, limit)
  },
})

// Get a single todo
const getOneTodo = Object.freeze<ServerRoute>({
  method: 'GET',
  path: '/{id}',
  handler: (req, _h) => {
    // get data from request
    const { mongo } = req
    const { id } = req.params

    // call handler (request-agnostic)
    return getOne(mongo, id)
  },
})

// Add a new todo to the database
const postTodo = Object.freeze<ServerRoute>({
  method: 'POST',
  path: '/',
  options: {
    validate: {
      payload: (v: unknown) => Todo.parseAsync(v),
    },
  },
  handler: async (req: Request<{ Payload: Todo }>, h) => {
    // get data from request
    const mongo = req.mongo
    const todo = req.payload

    // call handler (request-agnostic)
    const res = await create(mongo, todo)
    return h
      .response(res)
      .code(201)
      .header('location', `${req.url}/${res.insertedId}`)
  },
})

// Update the details of a todo
const putTodo = Object.freeze<ServerRoute>({
  method: 'PUT',
  path: '/{id}',
  options: {
    validate: {
      payload: (v: unknown) => Todo.parseAsync(v),
    },
  },
  handler: async (req: Request<{ Payload: Todo }>, _h) => {
    // get data from request
    const { mongo } = req
    const { id } = req.params
    const todo = req.payload

    // call handler (request-agnostic)
    return update(mongo, id, todo)
  },
})

// Delete a todo from the database
const deleteTodo = Object.freeze<ServerRoute>({
  method: 'DELETE',
  path: '/{id}',
  handler: (req, _h) => {
    // get data from request
    const { mongo } = req
    const { id } = req.params

    // call handler (request-agnostic)
    return remove(mongo, id)
  },
})

// Search for a todo
const getSearch = Object.freeze<ServerRoute>({
  method: 'GET',
  path: '/search',
  handler: (req, _h) => {
    // get data from request
    const { mongo } = req
    const term = req.query.term

    // call handler (request-agnostic)
    return search(mongo, term)
  },
})

/**
 * Routes of the plugin `todos`
 */
export default [
  getAllTodos,
  getOneTodo,
  postTodo,
  putTodo,
  deleteTodo,
  getSearch,
]
