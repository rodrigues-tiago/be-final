import Chance from 'chance'


export const seed = (): string => {
  if (!process.env['RANDOM_SEED']) process.env['RANDOM_SEED'] = (new Date).valueOf().toString()
  return process.env['RANDOM_SEED']
}

/** Returns an instance of Chance, created with a repeatable "seed". */
export const makeChance = (): Chance.Chance => Chance(seed())
