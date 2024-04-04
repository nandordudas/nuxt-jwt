import { compare } from 'bcrypt'
import { consola } from 'consola'
import { SignJWT } from 'jose'
import { z } from 'zod'

import { randomUUID } from 'node:crypto'

const userSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Must be at least 8 characters'),
})

const __passwordHash = '$2b$10$nodixrymXe.UPWEvAzQiDe52i7Hhx/CP.V3SMW7/mCIBtSyeQWTfe'

export default defineEventHandler(async (event) => {
  setResponseHeader(event, 'Accept', 'application/vnd.api+json')

  consola.log('context', event.context)

  const body = await readValidatedBody(event, userSchema.parse)
  const __isPasswordValid = await compare(body.password, __passwordHash)
  const user = { userId: '1' }
  const accessToken = await generateAccessTokens(useRuntimeConfig().jwtAccessTokenSecret, user)

  setCookie(event, 'token', accessToken, {
    httpOnly: true,
    maxAge: 15 * 60, // 15 minutes
    sameSite: 'strict',
    secure: true,
  })

  return { errors: null }
})

interface Payload {
  userId: string
}

async function generateAccessTokens(jwtAccessTokenSecret: string, payload: Payload): Promise<Token.Data['accessToken']> {
  const audience = 'https://localhost'
  const secret = encode(jwtAccessTokenSecret)

  const accessToken = await new SignJWT({ emailVerified: false, tokenId: randomUUID() })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuer(audience)
    .setSubject(payload.userId)
    .setAudience([audience])
    .setJti(payload.userId)
    .setNotBefore('15m ago')
    .setExpirationTime('15m')
    .setIssuedAt()
    .sign(secret)

  return accessToken
}
