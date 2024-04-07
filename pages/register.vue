<script setup lang="ts">
useHead({ title: 'Register' })

const authStore = useAuthStore()
</script>

<template>
  <div class="grid place-items-center h-screen">
    <h1>Register</h1>

    <AuthRegister :loading="authStore.loading" @submit="authStore.register" />
  </div>
</template>
