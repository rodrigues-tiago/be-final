import crypto from 'node:crypto'
import Hapi from '@hapi/hapi'
import HapiBasic from '@hapi/basic'
import {getUser} from './get-user'


/** ATTENTION: NOT SAFE FOR PRODUCTION (weak hash, no salt) */
export const validate: HapiBasic.Validate = async (_req, usr, pwd, _h) => {
  const dbUser = await getUser(usr)
  if (!dbUser) return {isValid: false, credentials: null}

  const bUsrPwd = Buffer.from(dbUser.pwd, 'base64')
  const bArgPwd = crypto.createHash('md5').update(pwd).digest()
  const isValid = crypto.timingSafeEqual(bUsrPwd, bArgPwd)

  const user: Hapi.UserCredentials = {usr: dbUser.usr, name: dbUser.name}

  return {isValid, credentials: {user}}
}
