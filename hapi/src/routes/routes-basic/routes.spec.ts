import Hapi from '@hapi/hapi'
import {makeChance} from '../../lib/chance'
import authBasic from '../../lib/auth-basic'
import {dbUsers} from '../../lib/auth-basic/get-user'
import routes from './routes'
import * as service from './service'

const chance = makeChance()
const server = Hapi.server()

/** returns a HTTP header with valid Basic Auth entry */
const authHeader = (usr: string, pwd: string) => {
  const credentials = Buffer.from(`${usr}:${pwd}`).toString('base64')
  return {Authorization: `Basic ${credentials}`}
}

const fakeResult = Object.fromEntries(chance.unique(() => [chance.string(), chance.string()], 5))

const stubs: Record<string, jest.SpyInstance | jest.Mock> = {}
beforeAll(async () => {
  await server.register(authBasic)
  server.route(routes)

  stubs['showAuth'] = jest.spyOn(service, 'showAuth')
})

beforeEach(() => {
  stubs['showAuth'].mockResolvedValue(fakeResult)
})

afterEach(() => { jest.resetAllMocks() })
afterAll(() => { jest.restoreAllMocks() })


describe('route GET /required', () => {

  it('rejects WITHOUT Basic Authentication', async () => {
    const res = await server.inject({method: 'GET', url: '/required'})

    expect(res.statusCode).toEqual(401)
    expect(stubs['showAuth']).toBeCalledTimes(0)
  })

  it('rejects requests with INVALID Basic Authentication', async () => {
    const usr = chance.string()
    const pwd = chance.string()
    const headers = authHeader(usr, pwd)
    const res = await server.inject({method: 'GET', url: '/required', headers})

    expect(res.statusCode).toEqual(401)
    expect(stubs['showAuth']).toBeCalledTimes(0)
  })

  it('accepts requests with VALID Basic Authentication', async () => {
    const {usr, unsafePwd} = chance.pickone(dbUsers.map(el => el))
    const headers = authHeader(usr, unsafePwd)
    const res = await server.inject({method: 'GET', url: '/required', headers})

    expect(res.statusCode).toEqual(200)
    expect(res.result).toEqual(fakeResult)
    expect(stubs['showAuth']).toBeCalledTimes(1)
    expect(stubs['showAuth']).lastCalledWith(expect.objectContaining({
      isAuthenticated: true,
      strategy: 'basic-unsafe',
      credentials: expect.objectContaining({
        user: expect.objectContaining({usr}),
      }),
      error: null,
    }))
  })

})

describe('route GET /optional', () => {

  it('accepts WITHOUT Basic Authentication', async () => {
    const res = await server.inject({method: 'GET', url: '/optional'})

    expect(res.statusCode).toEqual(200)
    expect(res.result).toEqual(fakeResult)
    expect(stubs['showAuth']).toBeCalledTimes(1)
    expect(stubs['showAuth']).lastCalledWith(expect.objectContaining({
      isAuthenticated: false,
      strategy: null, // does not match any auth strategy
      credentials: null,
      error: expect.objectContaining({message: 'Missing authentication'}),
    }))
  })

  it('rejects requests with INVALID Basic Authentication', async () => {
    const usr = chance.string()
    const pwd = chance.string()
    const headers = authHeader(usr, pwd)
    const res = await server.inject({method: 'GET', url: '/optional', headers})

    expect(res.statusCode).toEqual(401)
    expect(stubs['showAuth']).toBeCalledTimes(0)
  })

  it('accepts requests with VALID Basic Authentication', async () => {
    const {usr, unsafePwd} = chance.pickone(dbUsers.map(el => el))
    const headers = authHeader(usr, unsafePwd)
    const res = await server.inject({method: 'GET', url: '/optional', headers})

    expect(res.statusCode).toEqual(200)
    expect(res.result).toEqual(fakeResult)
    expect(stubs['showAuth']).toBeCalledTimes(1)
    expect(stubs['showAuth']).lastCalledWith(expect.objectContaining({
      isAuthenticated: true,
      strategy: 'basic-unsafe',
      credentials: expect.objectContaining({
        user: expect.objectContaining({usr}),
      }),
      error: null,
    }))
  })

})

describe('route GET /try', () => {
  it('accepts WITHOUT Basic Authentication', async () => {
    const res = await server.inject({method: 'GET', url: '/try'})

    expect(res.statusCode).toEqual(200)
    expect(res.result).toEqual(fakeResult)
    expect(stubs['showAuth']).toBeCalledTimes(1)
    expect(stubs['showAuth']).lastCalledWith(expect.objectContaining({
      isAuthenticated: false,
      strategy: null, // does not match any auth strategy
      credentials: null,
      error: expect.objectContaining({message: 'Missing authentication'}),
    }))
  })

  it('accepts requests with INVALID Basic Authentication', async () => {
    const usr = chance.string()
    const pwd = chance.string()
    const headers = authHeader(usr, pwd)
    const res = await server.inject({method: 'GET', url: '/try', headers})

    expect(res.statusCode).toEqual(200)
    expect(res.result).toEqual(fakeResult)
    expect(stubs['showAuth']).toBeCalledTimes(1)
    expect(stubs['showAuth']).lastCalledWith(expect.objectContaining({
      isAuthenticated: false,
      strategy: 'basic-unsafe',
      credentials: undefined,
      error: expect.objectContaining({message: 'Bad username or password'}),
    }))
  })

  it('accepts requests with VALID Basic Authentication', async () => {
    const {usr, unsafePwd} = chance.pickone(dbUsers.map(el => el))
    const headers = authHeader(usr, unsafePwd)
    const res = await server.inject({method: 'GET', url: '/try', headers})

    expect(res.statusCode).toEqual(200)
    expect(res.result).toEqual(fakeResult)
    expect(stubs['showAuth']).toBeCalledTimes(1)
    expect(stubs['showAuth']).lastCalledWith(expect.objectContaining({
      isAuthenticated: true,
      strategy: 'basic-unsafe',
      credentials: expect.objectContaining({
        user: expect.objectContaining({usr}),
      }),
      error: null,
    }))
  })

})
