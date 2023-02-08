import type { HapiMongo } from 'hapi-mongodb'
import z from 'zod'

// ID (gerado automaticamente pelo mongo)
// description: string de 2 a 50 caracteres;
// done: boolean;
// dueDate: Date -- cuidado que as datas devem ser transformadas para poderem ser utilizadas em JSON

export const Todo = z.object({
  description: z.string().min(2).max(50),
  done: z.boolean(),
  dueDate: z.coerce.date(),
})
export type Todo = z.infer<typeof Todo>

// By default, queries in MongoDB return all fields in matching documents. To limit the amount of data that MongoDB sends to applications, you can include a projection document to specify or restrict fields to return.
const projection = Object.fromEntries(Object.keys(Todo.shape).map((k) => [k, 1]))

export const getAll = (mongo: HapiMongo, offset: number, limit: number) =>
  mongo.db.collection('todos').find({}, { projection }).skip(offset).limit(limit).toArray()

export const getOne = (mongo: HapiMongo, id: string) =>
  mongo.db.collection('todos').findOne({ _id: new mongo.ObjectID(id) }, { projection })

export const create = (mongo: HapiMongo, todo: Todo) => mongo.db.collection('todos').insertOne(todo)

export const update = (mongo: HapiMongo, id: string, todo: Todo) =>
  mongo.db.collection('todos').updateOne({ _id: new mongo.ObjectID(id) }, { $set: todo })

export const remove = (mongo: HapiMongo, id: string) =>
  mongo.db.collection('todos').deleteOne({ _id: new mongo.ObjectID(id) })

export const search = (mongo: HapiMongo, query: string) =>
  mongo.db
    .collection('todos')
    .aggregate([
      {
        $searchBeta: {
          search: {
            query: query,
            path: 'description',
          },
        },
      },
      { $project: projection },
      { $limit: 10 },
    ])
    .toArray()
