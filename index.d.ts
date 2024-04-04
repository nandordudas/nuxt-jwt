// declare module '#app' {
//   interface NuxtApp {
//     $api: (msg: string) => string
//   }
// }

declare module 'nuxt/schema' {
  interface RuntimeConfig {
    jwtAccessTokenSecret: string
    jwtRefreshTokenSecret: string
    jwtAccessTokenExpires: string
    jwtRefreshTokenExpires: string
  }
}

declare module 'h3' {
  interface H3EventContext { }
}

declare global {
  type Nullable<T> = T | null | undefined

  interface User {}

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
