import type {Plugin} from '@hapi/hapi'
import routes from './routes'


/**
 * `validated@1.0.0`
 * Recommended route prefix 'api/validated'
 */
export default Object.freeze<Plugin<void>>({
  name: 'validated',
  version: '1.0.0',
  register: server => server.route(routes),
})
