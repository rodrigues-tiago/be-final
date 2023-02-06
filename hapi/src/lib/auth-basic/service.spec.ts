import Hapi from '@hapi/hapi'
import {makeChance} from '../chance'
import {validate} from './service'
import {dbUsers} from './get-user'

const chance = makeChance()


const fakeRequest = {} as Hapi.Request
const fakeResponseToolkit = {} as Hapi.ResponseToolkit

describe('validate', () => {

  it('returns invalid result with null credentials when user is not found', async () => {
    const usr = chance.string()
    const pwd = chance.string()
    const res = await validate(fakeRequest, usr, pwd, fakeResponseToolkit)

    expect(res).toHaveProperty('isValid', false)
    expect(res).toHaveProperty('credentials', null)
  })

  it('returns invalid result with credentials when user is found, but passwords do not match', async () => {
    const {usr, name} = chance.pickone(dbUsers.map(el => el))
    const pwd = chance.string()
    const res = await validate(fakeRequest, usr, pwd, fakeResponseToolkit)

    expect(res).toHaveProperty('isValid', false)
    expect(res).toHaveProperty('credentials', {user: {usr, name}})
  })

  it('returns valid result with credentials when user is found, but passwords do not match', async () => {
    const {usr, name, unsafePwd} = chance.pickone(dbUsers.map(el => el))
    const res = await validate(fakeRequest, usr, unsafePwd, fakeResponseToolkit)

    expect(res).toHaveProperty('isValid', true)
    expect(res).toHaveProperty('credentials', {user: {usr, name}})
  })

})
