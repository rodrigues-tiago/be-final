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
 * Routes of the plugin `hello`
 */
export default [getDefault]
