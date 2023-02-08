// define as rotas

import type { ServerRoute, Request } from '@hapi/hapi'
import { getAll } from './service'

/**
 * Get all todos
 * @handle `GET /`
 */

// Get a all todos
const getAllTodos = Object.freeze<ServerRoute>({
  method: 'GET',
  path: '/',
  handler: (req, _h) => {
    const { mongo } = req

    return getAll(mongo)
  },
})

// Get a single todo
const getOneTodo = Object.freeze<ServerRoute>({
  method: 'GET',
  path: '/{id}',
  handler: (req, h) => {
    return 'Return a single todo'
  },
})

// Add a new todo to the database
const postTodo = Object.freeze<ServerRoute>({
  method: 'POST',
  path: '/',
  handler: (req, h) => {
    return 'Add new todo'
  },
})

// Update the details of a todo
const putTodo = Object.freeze<ServerRoute>({
  method: 'PUT',
  path: '/{id}',
  handler: (req, h) => {
    return 'Update a single todo'
  },
})

// Delete a todo from the database
const deleteTodo = Object.freeze<ServerRoute>({
  method: 'DELETE',
  path: '/{id}',
  handler: (req, h) => {
    return 'Delete a single todo'
  },
})

// Search for a todo
const getSearch = Object.freeze<ServerRoute>({
  method: 'GET',
  path: '/search',
  handler: (req, h) => {
    return 'Return search results for the specified term'
  },
})

/**
 * Routes of the plugin `todos`
 */
export default [getAllTodos, getOneTodo, postTodo, putTodo, deleteTodo, getSearch]
