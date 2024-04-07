<script setup lang="ts">
// eslint-disable-next-line perfectionist/sort-objects
defineOptions({ name: 'Register', inheritAttrs: false })

defineProps<{
  loading: boolean
}>()

const emit = defineEmits<{
  submit: [Register.User]
}>()

const state = shallowReactive<Register.User>({
  confirmPassword: '',
  email: '',
  password: '',
})

function onSubmit(): void {
  emit('submit', state)
}
</script>

<template>
  <UCard class="w-96">
    <UForm class="space-y-4" :state :schema="registerFormSchema" :inert="loading" @submit="onSubmit">
      <UFormGroup label="Email" name="email">
        <UInput v-model="state.email" placeholder="Email" type="email" autocomplete="username" />
      </UFormGroup>

      <UFormGroup label="Password" name="password">
        <UInput v-model="state.password" type="password" placeholder="Password" autocomplete="current-password" />
      </UFormGroup>

      <UFormGroup label="Confirm password" name="confirmPassword">
        <UInput v-model="state.confirmPassword" type="password" placeholder="Confirm Password" />
      </UFormGroup>

      <div class="flex justify-between">
        <UButton type="submit" :loading="loading">
          Register
        </UButton>

        <UButton to="/login" variant="link">
          Login
        </UButton>
      </div>
    </UForm>
  </UCard>
</template>
