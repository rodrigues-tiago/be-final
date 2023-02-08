import Hapi from '@hapi/hapi'

import pluginLogger from './lib/logger'
import pluginAuthBasic from './lib/auth-basic'
import pluginMongo from './lib/mongo'

import todos from './routes/todos'
import hello from './routes/hello'

/**
 * Initializes the server (starts the caches, finalizes plugin registration) but does not start
 * listening on the connection port ({@link Hapi.Server.initialize more}). Use this to get a server
 * instance for tests ({@link https://hapi.dev/tutorials/testing/?lang=en_US more}).
 *
 * @param port {@link Hapi.ServerOptions.port}
 * @returns singleton instance of server
 */
export default async (options?: Hapi.ServerOptions): Promise<Readonly<Hapi.Server>> => {
  const server = Hapi.server(options)

  await Promise.all([
    server.register(pluginLogger),
    server.register(pluginAuthBasic),
    server.register(pluginMongo),
  ])

  await Promise.all([
    server.register(todos, { routes: { prefix: '/api/todos' } }),
    server.register(hello, { routes: { prefix: '/api/hello' } }),
  ])

  await server.initialize()

  return server
}
