import { isReadable } from './utils/is-readable'

interface DevServerHttps {
  cert: string
  key: string
}

const httpsServerFiles: DevServerHttps = {
  cert: import.meta.env.DEV_SERVER_CERT,
  key: import.meta.env.DEV_SERVER_KEY,
}

export default defineNuxtConfig({
  app: {
    head: {
      titleTemplate: '%s - Nuxt 3',
    },
  },

  colorMode: {
    classSuffix: '', // Because of @nuxt/ui
  },

  devServer: {
    https: Object.values(httpsServerFiles).every(isReadable) ? httpsServerFiles : false,
  },

  eslint: {
    config: {
      standalone: false,
    },
  },

  experimental: {
    typedPages: true,
  },

  modules: [
    '@nuxt/eslint',
    '@vueuse/nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/ui',
    '@nuxt/test-utils/module',
    '@pinia/nuxt',
  ],

  runtimeConfig: {
    jwtAccessTokenSecret: '',
    jwtRefreshTokenSecret: '',
  },

  tailwindcss: {
    quiet: true,
  },

  testUtils: {
    vitestConfig: {
      environment: 'happy-dom',
      globals: true,
    },
  },

  ui: {
    icons: ['simple-icons'],
  },
})
