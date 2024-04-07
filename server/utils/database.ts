import { genSalt, hash } from 'bcrypt'
import { consola } from 'consola'

export function migrateDatabase(): void {
  const db = useDatabase()

  // db.sql`DROP TABLE IF EXISTS users`

  db.sql`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    refresh_token TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`

  db.sql`CREATE INDEX IF NOT EXISTS users_email_idx ON users (email)`
}

export async function addUser(user: Login.User): Promise<void> {
  const db = useDatabase()

  const salt = await genSalt()
  const password = await hash(user.password, salt)

  await db.sql`
    INSERT INTO users (
      email,
      password
    )
    VALUES (
      ${user.email},
      ${password}
    )`
}

export async function updateUserRefreshToken(email: string, refreshToken: string): Promise<void> {
  const db = useDatabase()

  await db
    .prepare(`
      UPDATE
        users
      SET
        refresh_token = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE 1=1
        AND email = ?`)
    .run(refreshToken, email)
}

export async function getUserByEmail(email: string): Promise<Database.User | undefined> {
  const db = useDatabase()

  try {
    const { rows } = await db.sql`
      SELECT
        users.id,
        users.email,
        users.password,
        users.refresh_token
      FROM
        users
      WHERE 1=1
        AND users.email = ${email}
      LIMIT 1`

    return rows?.at(0) as unknown as Database.User
  }
  catch (error) {
    consola.error('getUserByEmail', error)

    return undefined
  }
}
