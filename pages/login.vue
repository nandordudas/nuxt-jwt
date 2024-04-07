<script setup lang="ts">
useHead({ title: 'Login' })

const authStore = useAuthStore()
</script>

<template>
  <div class="grid place-items-center h-screen">
    <h1>Login</h1>

    <AuthLogin :loading="authStore.loading" @submit="authStore.login" />
  </div>
</template>
