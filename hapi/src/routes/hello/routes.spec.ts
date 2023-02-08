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

  it('handles happy path', async () => {
    const res = await server.inject({method: 'GET', url: '/'})

    expect(res.statusCode).toEqual(200)
    expect(res.result).toEqual(fakeHello)
  })
})
