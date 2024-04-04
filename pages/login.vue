<script setup lang="ts">
useHead({ title: 'Login' })

const authStore = useAuthStore()
</script>

<template>
  <div>
    <h1>Login</h1>

    <UButton @click="authStore.login">
      Login
    </UButton>
  </div>
</template>
