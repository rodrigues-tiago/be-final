import Hapi from '@hapi/hapi'

import pluginLogger from './lib/logger'
import pluginAuthBasic from './lib/auth-basic'
import pluginAuthFoo from './lib/auth-foo'
import pluginMongo from './lib/mongo'

import hello from './routes/hello'
import movies from './routes/movies'
import health from './routes/health'
import validated from './routes/validated'
import authBasic from './routes/routes-basic'
import authFoo from './routes/routes-foo'


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
    server.register(pluginAuthFoo),
  ])

  await Promise.all([
    server.register(hello, {routes: {prefix: '/api/hello'}}),
    server.register(movies, {routes: {prefix: '/api/movies'}}),
    server.register(health, {routes: {prefix: '/api/health'}}),
    server.register(validated, {routes: {prefix: '/api/validated'}}),
    server.register(authBasic, {routes: {prefix: '/api/route-basic'}}),
    server.register(authFoo, {routes: {prefix: '/api/route-foo'}}),
  ])

  await server.initialize()

  return server
}
