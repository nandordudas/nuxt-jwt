import { migrateDatabase } from '~/server/utils/database'

export default defineTask({
  run() {
    migrateDatabase()

    return {
      result: 'ok',
    }
  },
})
