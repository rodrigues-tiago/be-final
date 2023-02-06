import Hapi from '@hapi/hapi'
import {makeChance} from '../../lib/chance'
import routes from './routes'
import * as service from './service'

const chance = makeChance()
const server = Hapi.server()


const fakeHello = chance.string()

const stubs: Record<string, jest.SpyInstance | jest.Mock> = {}
beforeAll(() => {
  server.route(routes)
  stubs['hello'] = jest.spyOn(service, 'hello')
})

beforeEach(() => {
  stubs['hello'].mockResolvedValue(fakeHello)
})

afterEach(() => { jest.resetAllMocks() })
afterAll(() => { jest.restoreAllMocks() })


describe('route GET /', () => {

  it('returns greeting', async () => {
    const res = await server.inject({method: 'GET', url: '/'})

    expect(res.statusCode).toEqual(200)
    expect(res.result).toEqual(fakeHello)
  })
})

describe('route GET /with-content-type', () => {

  it('returns greeting', async () => {
    const res = await server.inject({method: 'GET', url: '/with-content-type'})

    expect(res.statusCode).toEqual(200)
    expect(res.result).toEqual(fakeHello)
  })

  it('returns content type as text/plain', async () => {
    const res = await server.inject({method: 'GET', url: '/with-content-type'})

    expect(res.statusCode).toEqual(200)
    expect(res.headers).toMatchObject({
      'content-type': expect.stringContaining('text/plain'),
    })
  })

})
