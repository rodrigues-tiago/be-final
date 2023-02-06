import {makeChance} from '../../lib/chance'
import {health} from './service'

const chance = makeChance()

const fakeUptime = chance.natural()

const stubs: Record<string, jest.SpyInstance | jest.Mock> = {}
beforeAll(() => {
  stubs['process_uptime'] = jest.spyOn(process, 'uptime')
})

beforeEach(() => {
  stubs['process_uptime'].mockReturnValue(fakeUptime)
})

afterEach(() => { jest.resetAllMocks() })
afterAll(() => { jest.restoreAllMocks() })

describe('health', () => {
  const HANDLER_WAIT = 20 // MUST be in synch with service.ts

  it('resolves to the process uptime and datestamp', async () => {
    const res = await health()

    expect(stubs['process_uptime']).toBeCalledTimes(1)
    expect(res).toMatchObject({
      alive: true,
      uptime: fakeUptime,
      now: expect.any(Date),
    })
  })

  it(`takes at least ${HANDLER_WAIT} ms to resolve`, async () => {
    const dt0 = Date.now()
    void await health()
    const dt1 = Date.now()

    expect(dt1).toBeGreaterThan(dt0 + HANDLER_WAIT)
  })
})
