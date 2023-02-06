import {echo} from './service'

describe('echo', () => {

  it('returns the given value', () => {
    const val = Symbol('val')
    const res = echo(val)

    expect(res).toBe(val)
  })
})
