import { consola } from 'consola'

// TODO: handle errors

export default defineWrappedResponseHandler(async (event) => {
  setResponseHeader(event, 'Accept', 'application/vnd.api+json')

  consola.log('context', event.context)

  return { errors: null }
})
