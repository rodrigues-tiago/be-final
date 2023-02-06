import type {ServerRoute} from '@hapi/hapi'
import {health} from './service'


// ------------------------------------------------------------------
// route `GET /`
// ------------------------------------------------------------------

/** Handles `GET /` */
const getDefault = Object.freeze<ServerRoute>({
  method: 'GET',
  path: '/',
  handler: (_req, _h) => health(),
})


// ------------------------------------------------------------------
// route `GET /cached`
// ------------------------------------------------------------------


/** Handles `GET /cached` */
const getCached = Object.freeze<ServerRoute>({
  method: 'GET',
  path: '/cached',
  handler: async (req, h) => {
    const {value, cached} = await req.server.methods['healthCached']()

    const now = new Date
    const lastModified = cached ? new Date(cached.stored) : now
    const ageInSeconds = Math.ceil((now.valueOf() - lastModified.valueOf()) / 1000)

    return h.response(value)
      .header('last-modified', lastModified.toUTCString())
      .header('age', ageInSeconds.toString())
  },
  options: {
    cache: {
      expiresIn: 200, // 200 milliseconds
      privacy: 'public',
    },
  },
})


// ------------------------------------------------------------------
// all routes
// ------------------------------------------------------------------

/** Routes of the `health` plugin  */
export default [
  getDefault,
  getCached,
]
