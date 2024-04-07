<script setup lang="ts">
// eslint-disable-next-line perfectionist/sort-objects
defineOptions({ name: 'Login', inheritAttrs: false })

defineProps<{
  loading: boolean
}>()

const emit = defineEmits<{
  submit: [Login.User]
}>()

const state = shallowReactive<Login.User>({
  email: '',
  password: '',
})

function onSubmit(): void {
  emit('submit', state)
}
</script>

<template>
  <UCard class="w-96">
    <UForm class="space-y-4" :state :schema="loginFormSchema" :inert="loading" @submit="onSubmit">
      <UFormGroup label="Email" name="email">
        <UInput v-model="state.email" placeholder="Email" type="email" autocomplete="username" />
      </UFormGroup>

      <UFormGroup label="Password" name="password">
        <UInput v-model="state.password" type="password" placeholder="Password" autocomplete="current-password" />
      </UFormGroup>

      <div class="flex justify-between">
        <UButton type="submit" :loading="loading">
          Login
        </UButton>

        <UButton to="/register" variant="link">
          Register
        </UButton>
      </div>
    </UForm>
  </UCard>
</template>
