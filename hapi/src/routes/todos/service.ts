import type { HapiMongo } from 'hapi-mongodb'
import z from 'zod'

// ID (gerado automaticamente pelo mongo)
// description: string de 2 a 50 caracteres;
// done: boolean;
// dueDate: Date -- cuidado que as datas devem ser transformadas para poderem ser utilizadas em JSON

export const Todo = z.object({
  // id: z.ObjectId(),
  description: z.string(),
  done: z.boolean(),
  dueDate: z.date(),
})
export type Todo = z.infer<typeof Todo>

const projection = Object.fromEntries(Object.keys(Todo.shape).map((k) => [k, 1]))

export const getAll = (mongo: HapiMongo) =>
  mongo.db.collection('todos').find({}, { projection }).sort({ metacritic: -1 }).toArray()
