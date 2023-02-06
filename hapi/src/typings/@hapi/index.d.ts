/**
 * @file '@hapi/index.d.ts'
 * Extends the interface `Hapi.ServerMethodCache`, allowing for server methods to chose whether to
 * return values _plain_ or _decorated_ with meta-information about the cache.
 *
 * This is property is standard to `@hapi/catbox` and its absence might be due to mis-alignment
 * in types.
 */

import type {DecoratedPolicyOptions} from '@hapi/catbox'

 declare module '@hapi/hapi' {
   interface ServerMethodCache {
     getDecoratedValue: DecoratedPolicyOptions<unknown>['getDecoratedValue']
   }
 }
