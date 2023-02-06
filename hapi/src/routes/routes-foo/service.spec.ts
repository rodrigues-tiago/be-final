import type {RequestAuth} from '@hapi/hapi'
import {showAuth} from './service'

describe('showAuth', () => {

  it('returns the given RequestAuth', () => {
    const auth = {} as RequestAuth
    const res = showAuth(auth)

    expect(res).toBe(auth)
  })

})
