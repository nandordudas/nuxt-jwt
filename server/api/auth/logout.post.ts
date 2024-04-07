import { consola } from 'consola'

export default defineEventHandler((event) => {
  const token = getCookie(event, 'token')

  if (!token)
    return consola.warn('No token found')

  deleteCookie(event, 'token')
})
