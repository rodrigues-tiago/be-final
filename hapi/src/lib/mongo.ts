import Hapi from '@hapi/hapi'
import hapiMongo from 'hapi-mongodb'

/**
 * `mongo@1.0.0`
 * - Register the 'hapi-mongodb'
 */
export default Object.freeze<Hapi.Plugin<void>>({
  name: 'mongo',
  version: '1.0.0',
  register: async (server) => {
    const usr = 'dbUser'
    const pwd = 'AS8WobdS2xCnjJ8A'
    const options: hapiMongo.Options = {
      url: `mongodb+srv://${usr}:${pwd}@edit-backend-jan-2023.8crhgg0.mongodb.net/?retryWrites=true&w=majority`,
      settings: { useUnifiedTopology: true },
      decorate: true,
    }

    await server.register({
      plugin: hapiMongo,
      options,
    })
  },
})

declare module '@hapi/hapi' {
  // extends typeof `Hapi.Server`
  interface Server {
    mongo: hapiMongo.HapiMongo
  }

  // extends typeof `Hapi.Request`
  interface Request {
    mongo: hapiMongo.HapiMongo
  }
}
