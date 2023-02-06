import Hapi from '@hapi/hapi'
import {makeChance} from '../../lib/chance'
import routes from './routes'
import * as service from './service'

const chance = makeChance()
const server = Hapi.server()


const fakeEcho = chance.string()

const stubs: Record<string, jest.SpyInstance | jest.Mock> = {}
beforeAll(() => {
  server.route(routes)
  stubs['echo'] = jest.spyOn(service, 'echo')
})

beforeEach(() => {
  stubs['echo'].mockResolvedValue(fakeEcho)
})

afterEach(() => { jest.resetAllMocks() })
afterAll(() => { jest.restoreAllMocks() })


describe('route GET /', () => {

  it('handles default route', async () => {
    const res = await server.inject({method: 'GET', url: '/'})
    expect(res.statusCode).toEqual(200)
    expect(res.result).toEqual(fakeEcho)
  })

})


describe('route GET /from-path/{name}/{age}', () => {

  it('parses arguments from path-parameters', async () => {
    const age = chance.natural({min: 1, max: 99})
    const name = chance.string({alpha: true})

    const res = await server.inject({method: 'GET', url: `/from-path/${name}/${age}`})
    expect(res.statusCode).toEqual(200)
    expect(stubs['echo']).toHaveBeenCalledTimes(1)
    expect(stubs['echo']).toHaveBeenCalledWith({name, age})
  })

  it.each([
    {msg: 'name', name: '', age: chance.floating({min: 99.00001})},
    {msg: 'age', name: chance.string({alpha: true}), age: ''},
  ])('returns 400 - Not Found, when $msg is empty', async ({name, age}) => {
    const res = await server.inject({method: 'GET', url: `/from-path/${name}/${age}`})
    expect(res.statusCode).toEqual(404)
  })

  it.each([
    {msg: 'too big', age: chance.floating({min: 99.00001})},
    {msg: 'too small', age: chance.floating({max: 0.999999})},
    {msg: 'not a number', age: chance.string({alpha: true})},
  ])('returns 400 - Bad Request, when age is $msg', async ({age}) => {
    const name = chance.string({alpha: true})

    const res = await server.inject({method: 'GET', url: `/from-path/${name}/${age}`})
    expect(res.statusCode).toEqual(400)
  })

  it.each([
    {msg: 'has digits', name: chance.shuffle([...chance.string({alpha: true}), '1']).join('')},
    {msg: 'has symbols', name: chance.shuffle([...chance.string({alpha: true}), '$']).join('')},
  ])('returns 400 - Bad Request, when name $msg ($name)', async ({name}) => {
    const age = chance.natural({min: 1, max: 99})

    const res = await server.inject({method: 'GET', url: `/from-path/${name}/${age}`})
    expect(res.statusCode).toEqual(400)
  })

})

describe('route GET /from-query?name={name}&age={age}', () => {

  it('parses arguments from path-parameters', async () => {
    const age = chance.natural({min: 1, max: 99})
    const name = chance.string({alpha: true})

    const res = await server.inject({method: 'GET', url: `/from-query?name=${name}&age=${age}`})
    expect(res.statusCode).toEqual(200)
    expect(stubs['echo']).toHaveBeenCalledTimes(1)
    expect(stubs['echo']).toHaveBeenCalledWith({name, age})
  })

  it.each([
    {msg: 'empty', age: ''},
    {msg: 'too big', age: chance.floating({min: 99.00001})},
    {msg: 'too small', age: chance.floating({max: 0.999999})},
    {msg: 'not a number', age: chance.string({alpha: true})},
  ])('returns 400 - Bad Request, when age is $msg', async ({age}) => {
    const name = chance.string({alpha: true})

    const res = await server.inject({method: 'GET', url: `/from-query?name=${name}&age=${age}`})
    expect(res.statusCode).toEqual(400)
  })

  it.each([
    {msg: 'is empty', name: ''},
    {msg: 'has digits', name: chance.shuffle([...chance.string({alpha: true}), '1']).join('')},
    {msg: 'has symbols', name: chance.shuffle([...chance.string({alpha: true}), '$']).join('')},
  ])('returns 400 - Bad Request, when name $msg ($name)', async ({name}) => {
    const age = chance.natural({min: 1, max: 99})

    const res = await server.inject({method: 'GET', url: `/from-query?name=${name}&age=${age}`})
    expect(res.statusCode).toEqual(400)
  })

})


describe('route GET /from-headers', () => {

  it('parses arguments from path-parameters', async () => {
    const age = chance.natural({min: 1, max: 99})
    const name = chance.string({alpha: true})

    const res = await server.inject({method: 'GET', url: '/from-headers', headers: {name, age}})
    expect(res.statusCode).toEqual(200)
    expect(stubs['echo']).toHaveBeenCalledTimes(1)
    expect(stubs['echo']).toHaveBeenCalledWith({name, age})
  })

  it.each([
    {msg: 'empty', age: ''},
    {msg: 'too big', age: chance.floating({min: 99.00001})},
    {msg: 'too small', age: chance.floating({max: 0.999999})},
    {msg: 'not a number', age: chance.string({alpha: true})},
  ])('returns 400 - Bad Request, when age is $msg', async ({age}) => {
    const name = chance.string({alpha: true})

    const res = await server.inject({method: 'GET', url: '/from-headers', headers: {name, age}})
    expect(res.statusCode).toEqual(400)
  })

  it.each([
    {msg: 'is empty', name: ''},
    {msg: 'has digits', name: chance.shuffle([...chance.string({alpha: true}), '1']).join('')},
    {msg: 'has symbols', name: chance.shuffle([...chance.string({alpha: true}), '$']).join('')},
  ])('returns 400 - Bad Request, when name $msg ($name)', async ({name}) => {
    const age = chance.natural({min: 1, max: 99})

    const res = await server.inject({method: 'GET', url: '/from-headers', headers: {name, age}})
    expect(res.statusCode).toEqual(400)
  })

})


describe('route POST /from-payload', () => {

  it('parses arguments from path-parameters', async () => {
    const age = chance.natural({min: 1, max: 99})
    const name = chance.string({alpha: true})

    const res = await server.inject({method: 'POST', url: '/from-payload', payload: {name, age}, validate: true})
    expect(res.statusCode).toEqual(200)
    expect(stubs['echo']).toHaveBeenCalledTimes(1)
    expect(stubs['echo']).toHaveBeenCalledWith({name, age})
  })

  it.each([
    {msg: 'empty', age: ''},
    {msg: 'too big', age: chance.floating({min: 99.00001})},
    {msg: 'too small', age: chance.floating({max: 0.999999})},
    {msg: 'not a number', age: chance.string({alpha: true})},
  ])('returns 400 - Bad Request, when age is $msg', async ({age}) => {
    const name = chance.string({alpha: true})

    const res = await server.inject({method: 'POST', url: '/from-payload', headers: {name, age}})
    expect(res.statusCode).toEqual(400)
  })

  it.each([
    {msg: 'is empty', name: ''},
    {msg: 'has digits', name: chance.shuffle([...chance.string({alpha: true}), '1']).join('')},
    {msg: 'has symbols', name: chance.shuffle([...chance.string({alpha: true}), '$']).join('')},
  ])('returns 400 - Bad Request, when name $msg ($name)', async ({name}) => {
    const age = chance.natural({min: 1, max: 99})

    const res = await server.inject({method: 'POST', url: '/from-payload', headers: {name, age}})
    expect(res.statusCode).toEqual(400)
  })

})
