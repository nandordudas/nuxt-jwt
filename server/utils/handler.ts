import { consola } from 'consola'
import type { EventHandler, EventHandlerRequest } from 'h3'

export function defineWrappedResponseHandler<T extends EventHandlerRequest, D>(
  handler: EventHandler<T, D>,
): EventHandler<T, D> {
  return defineEventHandler<T>(async (event) => {
    consola.log(`${event.method} ${event.node.req.url}`)

    try {
      const response = await handler(event)

      return { response }
    }
    catch (error) {
      return { error }
    }
  })
}
