import type {Plugin} from '@hapi/hapi'
import routes from './routes'


/**
 * `hello@1.0.0`
 * Recommended route prefix 'api/hello'
 */
export default Object.freeze<Plugin<void>>({
  name: 'hello',
  version: '1.0.0',
  register: server => server.route(routes),
})
