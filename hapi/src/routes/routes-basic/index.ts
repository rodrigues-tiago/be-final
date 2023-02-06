import type {Plugin} from '@hapi/hapi'
import routes from './routes'


/**
 * `restricted@1.0.0`
 * Recommended route prefix 'api/restricted'
 */
export default Object.freeze<Plugin<void>>({
  name: 'routes-basic',
  version: '1.0.0',
  dependencies: ['auth-basic-plugin'],
  register: server => server.route(routes),
})
