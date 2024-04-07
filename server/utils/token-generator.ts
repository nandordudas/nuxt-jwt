import { SignJWT } from 'jose'

import { randomUUID } from 'node:crypto'

interface JwtTokenGeneratorParams {
  jwtAccessTokenSecret: string
  jwtAccessTokenExpires: string
  jwtRefreshTokenSecret: string
  jwtRefreshTokenExpires: string
}

export function tokenGenerator(user: User): (params: JwtTokenGeneratorParams) => Promise<Token.Data> {
  const audience = 'https://localhost'

  const signJWT = new SignJWT({
    emailVerified: false,
    tokenId: randomUUID(),
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuer(audience)
    .setSubject(user.id.toString())
    .setAudience([audience])
    .setJti(user.id.toString())
    .setIssuedAt()

  return async (params) => {
    const accessToken = await signJWT
      .setNotBefore(`${params.jwtAccessTokenExpires} ago`)
      .setExpirationTime(params.jwtAccessTokenExpires)
      .sign(encode(params.jwtAccessTokenSecret))

    const refreshToken = await signJWT
      .setNotBefore(`${params.jwtRefreshTokenExpires} ago`)
      .setExpirationTime(params.jwtRefreshTokenExpires)
      .sign(encode(params.jwtRefreshTokenSecret))

    return {
      accessToken,
      refreshToken,
    }
  }
}
