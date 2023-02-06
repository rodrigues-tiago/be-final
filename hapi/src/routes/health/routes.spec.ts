import Hapi from '@hapi/hapi'
import Hoek from '@hapi/hoek'
import {makeChance} from '../../lib/chance'
import plugin from './index'
import * as service from './service'

// ATTENTION
// - the plugin must be registered, because it registers `server.methods['healthCached']`;
// - the server must be started, because it is required to test cached `server.methods`;


const chance = makeChance()
const server = Hapi.server()

const fakeResult = Object.fromEntries(chance.unique(() => [chance.string(), chance.string()], 5))

const stubs: Record<string, jest.SpyInstance | jest.Mock> = {}
beforeAll(async () => {
  // ATTENTION: plugin is registered and server is started
  await server.register(plugin)
  await server.start()

  stubs['service_health'] = jest.spyOn(service, 'health')
})

beforeEach(async () => {
  // ATTENTION: cache is cleared before each test
  await server.methods['healthCached'].cache.drop('')

  stubs['service_health'].mockResolvedValue(fakeResult)
})

afterEach(() => { jest.resetAllMocks() })
afterAll(async () => { jest.restoreAllMocks(); await server.stop() })


describe('route GET /', () => {

  it('returns health of the current proccess', async () => {
    const res = await server.inject({method: 'GET', url: '/'})

    expect(res.statusCode).toEqual(200)
    expect(res.result).toEqual(fakeResult)
  })
})

describe('route GET /cached', () => {

  const TEST_TIMEOUT = 10_1000    // MUST be greater than CACHE_EXPIRES_IN
  const CACHE_EXPIRES_IN = 10_000 // MUST be in synch with index.ts
  const HANDLER_WAIT = 1_000      // MUST be in synch with service.ts

  it('returns health of the current proccess', async () => {
    const res = await server.inject({method: 'GET', url: '/cached'})
    expect(res.statusCode).toEqual(200)

    expect(res.result).toEqual(fakeResult)
  })

  it('returns headers for client-side caching', async () => {
    const res = await server.inject({method: 'GET', url: '/cached'})
    expect(res.statusCode).toEqual(200)

    expect(res.headers).toHaveProperty('cache-control')
    expect(res.headers).toHaveProperty('last-modified')
    expect(res.headers).toHaveProperty('age')
  })

  it('returns cached result when called within expiration time', async () => {
    stubs['service_health'].mockImplementation(Date.now)

    const rs1 = await server.inject({method: 'GET', url: '/cached'})
    expect(rs1.statusCode).toEqual(200)

    const min = HANDLER_WAIT
    const max = CACHE_EXPIRES_IN - HANDLER_WAIT

    await Hoek.wait(chance.natural({min, max}))
    const rs2 = await server.inject({method: 'GET', url: '/cached'})
    expect(rs2.statusCode).toEqual(200)

    expect(rs1.result).toEqual(rs2.result)
  })

  it('returns new result when cache expires', async () => {
    stubs['service_health'].mockImplementation(Date.now)

    const rs1 = await server.inject({method: 'GET', url: '/cached'})
    expect(rs1.statusCode).toEqual(200)

    const min = CACHE_EXPIRES_IN + 1
    const max = CACHE_EXPIRES_IN * 2

    await Hoek.wait(chance.natural({min, max}))
    const rs2 = await server.inject({method: 'GET', url: '/cached'})
    expect(rs2.statusCode).toEqual(200)

    expect(rs1.result).not.toEqual(rs2.result)
  }, TEST_TIMEOUT)

})
