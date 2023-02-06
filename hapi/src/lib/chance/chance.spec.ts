import Chance from 'chance'
import {makeChance} from './chance'

let originalEnv: NodeJS.ProcessEnv
beforeAll(() => { originalEnv = {...process.env} })
afterEach(() => { process.env = {...originalEnv} })

describe('chance', () => {
  const stubs: Record<string, jest.SpyInstance | jest.Mock> = {}

  beforeAll(() => { stubs['stdout_write'] = jest.spyOn(process.stdout, 'write') })
  beforeEach(() => { stubs['stdout_write'].mockImplementation(() => undefined) })
  afterAll(() => { jest.restoreAllMocks() })


  it('returns an instance of Chance', () => {
    expect(makeChance()).toBeInstanceOf(Chance)
  })

  describe('when env["RANDOM_SEED"] is set', () => {
    beforeEach(() => { process.env['RANDOM_SEED'] = Math.random().toString() })

    it('always returns different instances of Chance', () => {
      expect(makeChance()).not.toBe(makeChance())
    })

    it('returns instances of Chance that generate the same pseudo-random sequence', () => {
      const [c1, c2] = [makeChance(), makeChance()]

      // instances are in sync (same seed, same number of calls)
      expect(c1.guid()).toEqual(c2.guid())
      expect(c1.guid()).toEqual(c2.guid())
    })
  })

  describe('when env["RANDOM_SEED"] is NOT set', () => {
    it('generates and sets a value to env["RANDOM_SEED"]', () => {
      expect(makeChance()).not.toBe(makeChance())
    })

    it('always returns different instances of Chance', () => {
      expect(makeChance()).not.toBe(makeChance())
    })

    it('returns instances of Chance that generate the same pseudo-random sequence', () => {
      const [c1, c2] = [makeChance(), makeChance()]

      // instances are in sync (same seed, same number of calls)
      expect(c1.guid()).toEqual(c2.guid())
      expect(c1.guid()).toEqual(c2.guid())
    })
  })
})
