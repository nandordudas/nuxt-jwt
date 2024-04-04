import type { EventBusKey } from '@vueuse/core'

export const loginEventKey: EventBusKey<{
  user: User
}> = Symbol('login-event-key')
