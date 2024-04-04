import { consola } from 'consola'

export default defineNuxtPlugin(() => {
  const $api = $fetch.create({
    baseURL: 'https://localhost:3000',
    async onResponseError(context) {
      consola.log('onResponseError', context)

      if (context.response.status === 401) {
        const response = await $fetch('/api/auth/refresh', { method: 'POST' })

        consola.log('onResponseError::response', response)
      }
    },
  })

  return {
    provide: {
      api: $api,
    },
  }
})
