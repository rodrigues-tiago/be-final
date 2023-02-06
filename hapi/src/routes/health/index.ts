import type {Plugin} from '@hapi/hapi'
import type {DecoratedResult, Policy} from '@hapi/catbox'
import {health} from './service'
import routes from './routes'


/**
 * `health@1.0.0`
 * Recommended route prefix 'api/health'
 */
export default Object.freeze<Plugin<void>>({
  name: 'health',
  version: '1.0.0',
  register: server => {

    // declare a server method warper for `service.health`, for caching;
    // don't use `health` directly, to avoid creating a closure and allow tests with mocks
    server.method('healthCached', () => health(), {cache: {
      expiresIn: 10_000,           // ms
      generateTimeout: 1_100,      // ms >>> `health` waits 1_000 ms!!
      getDecoratedValue: true,
    }})

    server.route(routes)
  },
})


declare module '@hapi/hapi' {
  type TFunOri = typeof health
  type TParams = Parameters<TFunOri>
  type TReturn = Promise<DecoratedResult<ReturnType<TFunOri>>>
  type TFunSrv = (...args: TParams) => TReturn
  type TCached = TFunSrv & {cache: Pick<Policy<unknown, Record<string, unknown>>, 'stats' | 'drop'>}

  // extends typeof `Server.method` with the specific server.method healthCached
  interface ServerMethods {
    'healthCached': TCached
  }
}
