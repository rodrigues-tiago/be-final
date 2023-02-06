import {makeChance} from '../../lib/chance'
import {hello} from './service'

const chance = makeChance()

describe('hello', () => {

  it('returns `hello world` when no argument is given', () => {
    const res = hello()
    expect(res).toEqual('hello world')
  })

  it('returns a greeting message name is given', () => {
    const name = chance.name()
    const res = hello(name)
    expect(res).toMatch('hello')
    expect(res).toMatch(name)
  })

})
