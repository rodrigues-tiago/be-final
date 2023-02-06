import Hapi from '@hapi/hapi'
import HapiBasic from '@hapi/basic'
import {validate} from './service'


/**
 * `auth-basic@1.0.0`
 * - Register the authentication scheme 'basic'
 * - Register the authentication strategy 'basic-unsafe'
 * - Extend typeof `Hapi.Request.auth.credentials.user` with credentials
 */
export default Object.freeze<Hapi.Plugin<void>>({
  name: 'auth-basic-plugin',
  version: '1.0.0',
  register: async server => {
    await server.register(HapiBasic)
    server.auth.strategy('auth-basic-strategy', 'basic', {validate})
  },
})


declare module '@hapi/hapi' {
  // extends typeof `Hapi.Request.auth.credentials.user`
  interface UserCredentials {
    usr: string
    name: string
  }
}
