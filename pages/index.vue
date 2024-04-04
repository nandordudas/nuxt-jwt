<script setup lang="ts">
useHead({ title: 'Home' })

const authStore = useAuthStore()
</script>

<template>
  <div>
    <h1>Home</h1>

    <UButton @click="authStore.logout">
      Logout
    </UButton>
  </div>
</template>
