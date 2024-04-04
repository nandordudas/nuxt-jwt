import { consola } from 'consola'
import { SignJWT } from 'jose'

import { randomUUID } from 'node:crypto'

export default defineWrappedResponseHandler(async (event) => {
  consola.log('context', event.context)

  const audience = 'https://localhost'
  const config = useRuntimeConfig()
  const key = encode(config.jwtAccessTokenSecret)

  const signJWT = new SignJWT({ emailVerified: false, tokenId: randomUUID() })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuer(audience)
    // .setSubject(payload.userId)
    .setAudience([audience])
    // .setJti(payload.userId)
    .setIssuedAt()

  const accessToken = await signJWT
    .setNotBefore('15m ago')
    .setExpirationTime('15m')
    .sign(key)

  const refreshToken = await signJWT
    .setNotBefore('1w ago')
    .setExpirationTime('1w')
    .sign(key)

  return { accessToken, refreshToken }
})
