import { consola } from 'consola'

export const useAuthStore = defineStore('auth', () => {
  const loading = shallowRef(false)
  const user = shallowRef<Nullable<User>>(null)
  const token = shallowRef<Nullable<string>>(null)

  const isAuthenticated = computed(() => !!token.value)

  async function register(user: UserWithPassword): Promise<void> {
    loading.value = true

    const toast = useToast()

    try {
      await $fetch('/api/auth/register', {
        body: user,
        method: 'POST',
      })

      toast.add({
        color: 'green',
        title: 'Account created',
      })

      await navigateTo('/login', {
        replace: true,
      })
    }
    catch (error) {
      consola.error(error)

      toast.add({
        color: 'red',
        title: 'Something went wrong',
      })
    }

    loading.value = false
  }

  async function login(user: UserWithPassword): Promise<void> {
    loading.value = true

    const toast = useToast()

    try {
      await $fetch('/api/auth/login', {
        body: user,
        method: 'POST',
      })

      toast.add({
        color: 'green',
        title: 'Logged in',
      })

      await navigateTo('/dashboard', {
        replace: true,
      })
    }
    catch (error) {
      consola.error(error)

      toast.add({
        color: 'red',
        title: 'Something went wrong',
      })
    }

    loading.value = false
  }

  async function logout(): Promise<void> {
    loading.value = true

    const toast = useToast()

    try {
      await $fetch('/api/auth/logout', {
        method: 'POST',
      })

      toast.add({
        color: 'green',
        title: 'Logged out',
      })

      await navigateTo('/', {
        replace: true,
      })
    }
    catch (error) {
      consola.error(error)

      toast.add({
        color: 'red',
        title: 'Something went wrong',
      })
    }

    loading.value = false
  }

  return {
    isAuthenticated,
    loading,
    login,
    logout,
    register,
    token,
    user,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
