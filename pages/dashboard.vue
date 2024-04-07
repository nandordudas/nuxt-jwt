<script setup lang="ts">
useHead({ title: 'Dashboard' })

const authStore = useAuthStore()
</script>

<template>
  <div>
    <h1>Dashboard</h1>

    <UButton variant="link" to="/">
      Home
    </UButton>

    <UButton variant="link" @click="authStore.logout">
      Logout
    </UButton>
  </div>
</template>
