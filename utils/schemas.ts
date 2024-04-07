import { z } from 'zod'

const passwordSchema = z.string().min(8, 'Must be at least 8 characters')

export const loginFormSchema = z.object({
  email: z.string().email('Invalid email'),
  password: passwordSchema,
})

export const registerFormSchema = loginFormSchema
  .extend({
    confirmPassword: passwordSchema,
  })
  .refine(({ confirmPassword, password }) => confirmPassword === password, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })
