import Hapi from '@hapi/hapi'
import { makeChance } from '../../lib/chance'
import routes from './routes'
import * as service from './service'

const chance = makeChance()
const server = Hapi.server()

const fakeGetAll = chance.string()

const stubs: Record<string, jest.SpyInstance | jest.Mock> = {}
beforeAll(() => {
  server.route(routes)

  stubs['getAll'] = jest.spyOn(service, 'getAll')
})

beforeEach(() => {
  stubs['getAll'].mockResolvedValue(fakeGetAll)
})

afterEach(() => {
  jest.resetAllMocks()
})
afterAll(() => {
  jest.restoreAllMocks()
})

describe('route GET /', () => {
  const method = 'GET'
  const url = '/'

  it('exists and calls expected handler', async () => {
    const res = await server.inject({ method, url })

    expect(res.statusCode).toEqual(200)
    expect(res.result).toEqual(fakeGetAll)
  })
})
