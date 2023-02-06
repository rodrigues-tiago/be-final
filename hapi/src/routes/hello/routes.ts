import type {ServerRoute} from '@hapi/hapi'
import {hello} from './service'


/**
 * @handle `GET /`
 */
const getDefault = Object.freeze<ServerRoute>({
  method: 'GET',
  path: '/',
  handler: _req => hello(),
})

/**
 * @handle `GET /with-content-type`
 */
const getWithContentType = Object.freeze<ServerRoute>({
  method: 'GET',
  path: '/with-content-type',
  handler: async (_req, h) => {
    const res = await Promise.resolve(hello())
    return h.response(res).header('content-type', 'text/plain')
  },
})


/**
 * Routes of the plugin `hello`
 */
export default [getDefault, getWithContentType]
