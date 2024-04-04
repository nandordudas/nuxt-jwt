export const useAuthStore = defineStore('auth', () => {
  const { $api } = useNuxtApp()

  const user = ref<Nullable<User>>(null)
  const tokens = ref<Nullable<Token.Data>>(null)

  const isAuthenticated = computed(() => !!tokens.value)

  async function register(): Promise<void> {
    try {
      const body = { email: 'john.doe@mail.com', password: 'password' } as User

      await $api('/api/auth/register', { body, method: 'POST' })
    }
    catch (error) {
      console.error(error)
    }
  }

  async function login(): Promise<void> {
    try {
      const body = { email: 'john.doe@mail.com', password: 'password' } as User

      await $api('/api/auth/login', { body, method: 'POST' })
    }
    catch (error) {
      console.error(error)
    }
  }

  async function logout(): Promise<void> {
    try {
      await $fetch('/api/auth/logout', { method: 'POST' })
    }
    catch (error) {
      console.error(error)
    }
  }

  return {
    isAuthenticated,
    login,
    logout,
    register,
    tokens,
    user,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
