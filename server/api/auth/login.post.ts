import { compare } from 'bcrypt'

import { loginFormSchema } from '~/utils/schemas'

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, loginFormSchema.parse)
  const user = await getUserByEmail(body.email)

  if (!user) {
    throw createError({
      statusCode: 404,
      statusMessage: 'User not found',
    })
  }

  const isPasswordValid = await compare(body.password, user.password)

  if (!isPasswordValid) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid credentials',
    })
  }

  const generateTokens = tokenGenerator(user)
  const { accessToken } = await generateTokens(useRuntimeConfig())

  setCookie(event, 'token', accessToken, {
    httpOnly: true,
    maxAge: 60 * 15, // 15 minutes
    sameSite: 'strict',
    secure: true,
  })

  return {
    data: {
      success: true,
    },
    errors: null,
  }
})
