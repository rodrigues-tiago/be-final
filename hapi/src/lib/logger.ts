import Hapi from '@hapi/hapi'
import Boom from '@hapi/boom'
import HapiPino from 'hapi-pino'

/**
 * `logger@1.0.0`
 * - Register the 'HapiPino' as default logger (i.e Server.logger and Request.logger)
 * - Log the following events: ['response', 'request', 'onPostStart', 'onPostStop' ]
 * - ATTENTION: overrides the default failAction handler for routes validation
 */
export default Object.freeze<Hapi.Plugin<void>>({
  name: 'logger',
  version: '1.0.0',
  register: async server => {
    await HapiPino.register(server, options)

    // default value for server.settings.routes.validate.failAction === 'error'
    // see https://hapi.dev/api/?v=21.0.0#-routeoptionsvalidatefailaction
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, no-param-reassign
    server.settings.routes!.validate!.failAction = failAction
  },
})

const options = Object.freeze<HapiPino.Options>({})


/**
 * Logs the complete error that caused `failAction` and throws the given
 * standard error (that eventually will be returned as response to user)
 */
const failAction: Hapi.Lifecycle.FailAction = (request, _h, err?) => {
  request.logger.warn(err)

  throw err instanceof Boom.Boom && 'defaultError' in err.data
    ? err.data.defaultError // eslint-disable-line @typescript-eslint/no-unsafe-member-access -- this is safe
    : err
}
