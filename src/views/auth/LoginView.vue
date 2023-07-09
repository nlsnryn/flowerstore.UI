<script setup>
import { reactive, onMounted, computed } from 'vue'
import DefaultInput from '@/components/DefaultInput.vue'
import DefaultButton from '@/components/DefaultButton.vue'
import { useAuthStore } from '@/stores/auth.store'
import { RouterLink } from 'vue-router'
import { useErrorStore } from '@/stores/error.store'
import { useField, useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as zod from 'zod'

const authStore = useAuthStore()
const errorStore = useErrorStore()

const validationSchema = toTypedSchema(
  zod.object({
    email: zod.string().nonempty('Email is required').email({ message: 'Invalid email format' }),
    password: zod
      .string()
      .nonempty('Password is required')
      .min(8, { message: 'Password must atleast 8 characters' })
  })
)

const { handleSubmit, errors } = useForm({ validationSchema })
const { value: email } = useField('email')
const { value: password } = useField('password')

const onSubmit = handleSubmit(({ email, password }) => {
  authStore.login({ email, password })
})

function getErrorBorder(field) {
  return errors.value[field]
    ? 'focus:ring-red-700 mb-0 border-red-700'
    : 'focus:ring-blue-700 focus:border-blue-700 mb-3'
}

onMounted(() => {
  const isReload = localStorage.getItem('isReload')
  if (isReload === 'true') {
    localStorage.setItem('isReload', 'false')
    window.location.reload()
  }
})
</script>

<template>
  <section class="flex justify-center items-center min-h-screen">
    <div class="max-w-md w-full">
      <div v-if="errorStore.hasErrors" class="max-w-md mx-auto mb-2 px-2">
        <span class="text-xs font-medium uppercase tracking-wide text-red-500">{{
          errorStore.state.message
        }}</span>
      </div>
      <form @submit="onSubmit" class="border-2 border-blue-700 rounded-md px-6 py-5">
        <h1 class="text-blue-700 font-semibold text-3xl mb-10">Login Form</h1>

        <label for="email">Email:</label>
        <default-input
          type="email"
          name="email"
          id="email"
          placeholder="nelsonarabit@gmail.com"
          :modelValue="email"
          @newValue="(newValue) => (email = newValue)"
          :errorBorder="getErrorBorder('email')"
          required
        />
        <span v-show="errors.email" class="text-xs ml-1 text-red-700 block mb-2">{{
          errors.email
        }}</span>

        <label for="password">Password:</label>
        <default-input
          type="password"
          name="password"
          id="password"
          placeholder="*********"
          :modelValue="password"
          @newValue="(newValue) => (password = newValue)"
          :errorBorder="getErrorBorder('password')"
          required
        />
        <span v-show="errors.password" class="text-xs ml-1 text-red-700 block mb-2">{{
          errors.password
        }}</span>

        <default-button type="submit" class="mt-3">LOGIN</default-button>
        <p class="text-sm text-blue-700 mt-2 font-medium">
          Don't have an account?
          <span class="underline cursor-pointer"
            ><router-link :to="{ name: 'register' }">Register</router-link></span
          >
        </p>
      </form>
    </div>
  </section>
</template>
