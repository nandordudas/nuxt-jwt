import { genSalt, hash } from 'bcrypt'
import { consola } from 'consola'
import { SignJWT } from 'jose'
import { z } from 'zod'

import { randomUUID } from 'node:crypto'

// TODO: handle errors

const userSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Must be at least 8 characters'),
})

export default defineEventHandler(async (event) => {
  setResponseHeader(event, 'Accept', 'application/vnd.api+json')

  consola.log('POST /api/auth/register', event.context)

  const body = await readValidatedBody(event, userSchema.parse)
  const salt = await genSalt()
  const __passwordHash = await hash(body.password, salt) // TODO: store password hash in database
  const { refreshToken } = await refreshTokens(useRuntimeConfig().jwtAccessTokenSecret, { userId: '1' }) // TODO: store refresh token in database

  consola.log('passwordHash', __passwordHash)
  consola.log('refreshToken', refreshToken)

  return { errors: null }
})

interface Payload {
  userId: string
}

async function refreshTokens(jwtAccessTokenSecret: string, payload: Payload): Promise<Token.Data> {
  const audience = 'https://localhost'
  const key = encode(jwtAccessTokenSecret)

  const signJWT = new SignJWT({ emailVerified: false, tokenId: randomUUID() })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuer(audience)
    .setSubject(payload.userId)
    .setAudience([audience])
    .setJti(payload.userId)
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
}
