import Hoek from '@hapi/hoek'

/** Waits 50 ms and returns information about the process */
export const health = async () => {
  await Hoek.wait(1_000) // ms
  return {
    alive: true,
    uptime: Math.floor(process.uptime()), // value in seconds
    now: new Date,
  }
}
