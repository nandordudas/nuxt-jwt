import { loginFormSchema } from '~/utils/schemas'

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, loginFormSchema.parse)

  await addUser(body)

  const user = await getUserByEmail(body.email)

  if (!user) {
    throw createError({
      statusCode: 404,
      statusMessage: 'User not found',
    })
  }

  const generateTokens = tokenGenerator(user)
  const { refreshToken } = await generateTokens(useRuntimeConfig())

  await updateUserRefreshToken(body.email, refreshToken)

  return {
    data: {
      success: true,
    },
    errors: null,
  }
})
