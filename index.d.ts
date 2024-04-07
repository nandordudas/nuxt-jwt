// declare module '#app' {
//   interface NuxtApp {
//     $api: (msg: string) => string
//   }
// }

declare module 'nuxt/schema' {
  interface RuntimeConfig {
    jwtAccessTokenSecret: string
    jwtRefreshTokenSecret: string
    jwtAccessTokenExpires: '15m'
    jwtRefreshTokenExpires: '7d'
  }
}

declare module 'h3' {
  interface H3EventContext { }
}

declare global {
  type Nullable<T> = T | null | undefined

  interface User {
    id: number
    email: string
  }

  interface UserWithPassword extends User {
    password: string
  }

  namespace Database {
    interface User extends UserWithPassword {
      refresh_token: string
      created_at: Date
      updated_at: Date
    }
  }

  namespace Login {
    type User = Omit<UserWithPassword, 'id'>
  }

  namespace Register {
    interface User extends Omit<UserWithPassword, 'id'> {
      confirmPassword: string
    }
  }

  namespace Token {
    interface Container {
      expiration: number
      value: string
    }

    interface Data {
      accessToken: string // Token.Container
      refreshToken: string // Token.Container
    }
  }
}

export { }
