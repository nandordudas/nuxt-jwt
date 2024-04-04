<script setup lang="ts">
useHead({ title: 'Register' })

const authStore = useAuthStore()
</script>

<template>
  <div>
    <h1>Register</h1>

    <UButton @click="authStore.register">
      Register
    </UButton>
  </div>
</template>
