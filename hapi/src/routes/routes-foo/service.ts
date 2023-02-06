import type {RequestAuth} from '@hapi/hapi'

/** Returns information about request authorization and authentication */
export const showAuth = (auth: RequestAuth) => auth
