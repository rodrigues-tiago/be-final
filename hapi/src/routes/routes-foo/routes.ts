import type {ServerRoute} from '@hapi/hapi'
import {showAuth} from './service'


// ------------------------------------------------------------------
// route `GET /required`
// ------------------------------------------------------------------

/** Handles `GET /required` */
const getFooRequired = Object.freeze<ServerRoute>({
  method: 'GET',
  path: '/required',
  options: {
    auth: 'strategy-foo',
  },
  handler: (req, _h) => showAuth(req.auth),

})

// ------------------------------------------------------------------
// route `GET /optional`
// ------------------------------------------------------------------

/** Handles `GET /optional` */
const getFooOptional = Object.freeze<ServerRoute>({
  method: 'GET',
  path: '/optional',
  options: {
    auth: {
      mode: 'optional',
      strategy: 'strategy-foo',
    },
  },
  handler: (req, _h) => showAuth(req.auth),
})

// ------------------------------------------------------------------
// route `GET /try`
// ------------------------------------------------------------------

/** Handles `GET /try` */
const getFooTry = Object.freeze<ServerRoute>({
  method: 'GET',
  path: '/try',
  options: {
    auth: {
      mode: 'try',
      strategy: 'strategy-foo',
    },
  },
  handler: (req, _h) => showAuth(req.auth),
})


// ------------------------------------------------------------------
// all routes
// ------------------------------------------------------------------

/** Routes of the `restricted` plugin  */
export default [
  getFooRequired,
  getFooOptional,
  getFooTry,
]
