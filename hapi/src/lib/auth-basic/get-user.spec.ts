import {makeChance} from '../chance'
import {getUser, dbUsers} from './get-user'

const chance = makeChance()


describe('getUser', () => {
  it('returns one UserModel object, when user handle exists', async () => {
    const {usr, pwd, name} = chance.pickone(dbUsers.map(el => el))
    const res = await getUser(usr)

    expect(res).toBeInstanceOf(Object)
    expect(res).toEqual({usr, pwd, name})
  })

  it('returns undefined, when user handle does not exists', async () => {
    const usr = chance.string()
    const res = await getUser(usr)

    expect(res).toBe(undefined)
  })
})
